import { Request, Response, NextFunction } from "express";
import studentModel, { IStudent } from "../models/students.model";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { ErrorHandler } from "../config/ErrorHandler";
import { CatchAsyncErrors } from "../middleware/catchAsyncErrors";
import dotenv from "dotenv";
dotenv.config();
import ejs from "ejs";
import path from "path";
import sendMail from "../config/sendMail";
import {
  getUserById,
  getAllUsersStudentService,
  updateUserStudentRoleService,
} from "../services/userService";
import { redis } from "../config/redis";
import cloudinary from "cloudinary";
import universityModel, { IUniversity } from "../models/university.model";
import facultyModel, { IFaculty } from "../models/faculty.model";
import departmentModel, { IDepartment } from "../models/department.model";
import userModel from "../models/user.model";
import professorModel, { IProfessor } from "../models/professor.model";

// Register user
interface IRegistrationStudentBody {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  universityName: string;
  facultyName: string;
  departmentName: string;
  studentYearOfStudy: string;
  userCreatedById: string;
}

export const registrationUserStudent = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        name,
        email,
        password,
        universityName,
        facultyName,
        departmentName,
        studentYearOfStudy,
        userCreatedById,
      } = req.body;

      if (
        !name ||
        !email ||
        !password ||
        !userCreatedById ||
        !universityName ||
        !facultyName ||
        !departmentName ||
        !studentYearOfStudy
      ) {
        return next(new ErrorHandler("All fields are required", 400));
      }

      const foundEmailTwo = await userModel.findOne({ email });
      const foundEmailOne = await universityModel.findOne({ email });
      const foundEmailThree = await facultyModel.findOne({ email });
      const foundEmailFour = await departmentModel.findOne({ email });
      const foundEmailFive = await professorModel.findOne({ email });
      const foundEmailSix = await studentModel.findOne({ email });

      if (
        foundEmailOne ||
        foundEmailTwo ||
        foundEmailThree ||
        foundEmailFour ||
        foundEmailFive ||
        foundEmailSix
      ) {
        return next(new ErrorHandler("Email already exist ", 400));
      }

      const user: IRegistrationStudentBody = {
        name,
        email,
        password,
        universityName,
        userCreatedById,
        facultyName,
        departmentName,
        studentYearOfStudy,
      };

      const activationToken = createActivationToken(user);

      const activationCode = activationToken.activationCode;

      const data = { user: { name: user.name }, activationCode };

      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/activation-mail.ejs"),
        data
      );

      try {
        await sendMail({
          email: user.email,
          subject: "Activate your account",
          template: "activation-mail.ejs",
          data,
        });

        res.status(201).json({
          success: true,
          message: `Please check your email: ${user.email} to activate your account`,
          activationToken: activationToken.token,
        });
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

interface IActivationToken {
  token: string;
  activationCode: string;
}

export const createActivationToken = (user: any): IActivationToken => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

  const token = jwt.sign(
    {
      user,
      activationCode,
    },
    process.env.ACTIVATION_SECRET as Secret,
    {
      expiresIn: "5m",
    }
  );
  return { token, activationCode };
};

// Activate user
interface IActivationRequset {
  activation_token: string;
  activation_code: string;
}

export const activateUserStudent = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { activation_token, activation_code } =
        req.body as IActivationRequset;

      const newUser: { user: IStudent; activationCode: string } = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET as Secret
      ) as { user: IStudent; activationCode: string };

      if (newUser.activationCode !== activation_code) {
        return next(new ErrorHandler(`Invalid activation code`, 400));
      }

      const {
        name,
        email,
        password,
        universityName,
        facultyName,
        departmentName,
        studentYearOfStudy,
        userCreatedById,
      } = newUser.user;

      const foundEmailOne = await universityModel.findOne({ email });
      const foundEmailTwo = await userModel.findOne({ email });
      const foundEmailThree = await facultyModel.findOne({ email });
      const foundEmailFour = await departmentModel.findOne({ email });
      const foundEmailFive = await professorModel.findOne({ email });
      const foundEmailSix = await studentModel.findOne({ email });

      if (
        foundEmailOne ||
        foundEmailTwo ||
        foundEmailThree ||
        foundEmailFour ||
        foundEmailFive ||
        foundEmailSix
      ) {
        return next(new ErrorHandler("Email already exist ", 400));
      }

      const user = await studentModel.create({
        name,
        email,
        password,
        universityName,
        facultyName,
        departmentName,
        studentYearOfStudy,
        userCreatedById,
      });

      res.status(201).json({
        success: true,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Update user info
interface IUpdateUserStudentInfo {
  name: string;
}

export const updateUserStudentInfo = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name } = req.body as IUpdateUserStudentInfo;

      const userId = req.user?._id;

      const user = await studentModel.findById(userId);

      if (name && user) {
        user.name = name;
      }

      await user?.save();

      await redis.set(userId, JSON.stringify(user));

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Update user  password
interface IUpdateStudentPassword {
  oldPassword: string;
  newPassword: string;
}

export const updateStudentPassword = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { oldPassword, newPassword } = req.body as IUpdateStudentPassword;

      if (!oldPassword || !newPassword) {
        return next(new ErrorHandler("Please enter old and new password", 400));
      }

      const user = await studentModel
        .findById(req.user?._id)
        .select("+password");

      if (user?.password === undefined) {
        return next(new ErrorHandler("Invaild user", 400));
      }

      const isPasswordMatch = await user?.comparePassword(oldPassword);

      if (!isPasswordMatch) {
        return next(new ErrorHandler("Invaild old password", 400));
      }

      user.password = newPassword;

      await user.save();
      await redis.set(req.user?._id, JSON.stringify(user));

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Update profile avatar
interface IUpdateAvatarStudent {
  avatar: string;
}

export const updateProfilePictureStudent = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { avatar } = req.body as IUpdateAvatarStudent;

      const userId = await req.user?._id;

      const user = await studentModel.findById(userId);

      if (avatar && user) {
        // If user have an avatar
        if (user?.avatar?.public_id) {
          // First delete the old image
          await cloudinary.v2.uploader.destroy(user?.avatar?.public_id);

          const myCloud = await cloudinary.v2.uploader.upload(avatar, {
            folder: "avatars",
            width: 150,
          });

          user.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          };
        } else {
          const myCloud = await cloudinary.v2.uploader.upload(avatar, {
            folder: "avatars",
            width: 150,
          });

          user.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          };
        }
      }

      await user?.save();

      await redis.set(userId, JSON.stringify(user));

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Get All users -- Only for admin
export const getAllUsersStudent = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllUsersStudentService(res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Update user role [user Or admin] -- Only for admin
export const updateUserStudentRole = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, role } = req.body;
      const isUserExist = await studentModel.findOne({ email });
      if (isUserExist) {
        const id = isUserExist._id;
        updateUserStudentRoleService(res, id, role);
      } else {
        res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Delete User -- Only fo admin
export const deleteUserStudent = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const user = await studentModel.findById(id);

      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }

      await user.deleteOne({ id });

      await redis.del(id);

      res.status(201).json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
