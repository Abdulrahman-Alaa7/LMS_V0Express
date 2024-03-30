import { Request, Response, NextFunction } from "express";
import departmentModel, { IDepartment } from "../models/department.model";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { ErrorHandler } from "../config/ErrorHandler";
import { CatchAsyncErrors } from "../middleware/catchAsyncErrors";
import dotenv from "dotenv";
dotenv.config();
import ejs from "ejs";
import path from "path";
import sendMail from "../config/sendMail";
import {
  accessTokenOptions,
  refreshTokenOptions,
  sendTokenFaculty,
} from "../config/jwt";
import {
  getUserById,
  getAllUsersDepartmentService,
  updateUserDepartmentRoleService,
  updateDepartmentSemesterService,
  updateStudentYearByPromoteService,
  updateStudentYearAndNameService,
} from "../services/userService";
import { redis } from "../config/redis";
import cloudinary from "cloudinary";
import facultyModel, { IFaculty } from "../models/faculty.model";
import universityModel, { IUniversity } from "../models/university.model";
import userModel from "../models/user.model";
import studentModel from "../models/students.model";

// Register user
interface IRegistrationDepartmentBody {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  universityName: string;
  userCreatedById: string;
  facultyName: string;
  yearsOfStudy: number;
}

export const registrationUserDepartment = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        name,
        email,
        password,
        userCreatedById,
        universityName,
        facultyName,
        yearsOfStudy,
      } = req.body;

      if (
        !name ||
        !email ||
        !password ||
        !userCreatedById ||
        !universityName ||
        !facultyName ||
        !yearsOfStudy
      ) {
        return next(new ErrorHandler("All fields are required", 400));
      }

      const foundEmailOne = await universityModel.findOne({ email });
      const foundEmailTwo = await userModel.findOne({ email });
      const foundEmailThree = await facultyModel.findOne({ email });
      const foundEmailFour = await departmentModel.findOne({ email });

      if (foundEmailOne || foundEmailTwo || foundEmailThree || foundEmailFour) {
        return next(new ErrorHandler("Email already exist ", 400));
      }

      const user: IRegistrationDepartmentBody = {
        name,
        email,
        password,
        userCreatedById,
        universityName,
        facultyName,
        yearsOfStudy,
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

// Activate user faculty
interface IActivationRequset {
  activation_token: string;
  activation_code: string;
}

export const activateUserDepartment = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { activation_token, activation_code } =
        req.body as IActivationRequset;

      const newUser: { user: IDepartment; activationCode: string } = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET as Secret
      ) as { user: IDepartment; activationCode: string };

      if (newUser.activationCode !== activation_code) {
        return next(new ErrorHandler(`Invalid activation code`, 400));
      }

      const {
        name,
        email,
        password,
        userCreatedById,
        universityName,
        facultyName,
        yearsOfStudy,
      } = newUser.user;

      const foundEmailOne = await universityModel.findOne({ email });
      const foundEmailTwo = await userModel.findOne({ email });
      const foundEmailThree = await facultyModel.findOne({ email });
      const foundEmailFour = await departmentModel.findOne({ email });

      if (foundEmailOne || foundEmailTwo || foundEmailThree || foundEmailFour) {
        return next(new ErrorHandler("Email already exist ", 400));
      }

      const user = await departmentModel.create({
        name,
        email,
        password,
        userCreatedById,
        universityName,
        facultyName,
        yearsOfStudy,
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
interface IUpdateUserDepartmentInfo {
  name: string;
}

export const updateUserDepartmentInfo = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name } = req.body as IUpdateUserDepartmentInfo;

      const userId = req.user?._id;

      const user = await departmentModel.findById(userId);

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

// Update user Department password
interface IUpdateDepartmentPassword {
  oldPassword: string;
  newPassword: string;
}

export const updateDepartmentPassword = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { oldPassword, newPassword } =
        req.body as IUpdateDepartmentPassword;

      if (!oldPassword || !newPassword) {
        return next(new ErrorHandler("Please enter old and new password", 400));
      }

      const user = await departmentModel
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
interface IUpdateAvatarDepartment {
  avatar: string;
}

export const updateProfilePictureDepartment = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { avatar } = req.body as IUpdateAvatarDepartment;

      const userId = await req.user?._id;

      const user = await departmentModel.findById(userId);

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
export const getAllUsersDepartment = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllUsersDepartmentService(res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Update user role [user Or admin] -- Only for admin
export const updateUserDepartmentRole = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, role } = req.body;

      const isUserExist = await departmentModel.findOne({ email });
      if (isUserExist) {
        const id = isUserExist._id;
        updateUserDepartmentRoleService(res, id, role);
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

// Update user role [user Or admin] -- Only for admin
export const updateDepartmentSemester = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, semester } = req.body;

      const isUserExist = await departmentModel.findOne({ email });
      if (isUserExist) {
        const id = isUserExist._id;
        updateDepartmentSemesterService(res, id, semester);
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
export const deleteUserDepartment = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const user = await departmentModel.findById(id);

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

// Update Student year by promote button
export const updateStudentYearByPromote = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, studentYearOfStudy } = req.body;
      const isUserExist = await studentModel.findOne({ email });
      if (isUserExist) {
        const id = isUserExist._id;
        updateStudentYearByPromoteService(res, id, studentYearOfStudy);
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

// Update Student year and name
export const updateStudentYearAndName = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, name, studentYearOfStudy } = req.body;
      const isUserExist = await studentModel.findOne({ email });
      if (isUserExist) {
        const id = isUserExist._id;
        updateStudentYearAndNameService(res, id, name, studentYearOfStudy);
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
