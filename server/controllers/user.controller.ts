import { Request, Response, NextFunction } from "express";
import { MyRequest } from "../@types/custom";
import userModel, { IUser } from "../models/user.model";
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
  sendToken,
  sendTokenDepartment,
  sendTokenFaculty,
  sendTokenUniversity,
  sendTokenProfessor,
  sendTokenStudent,
} from "../config/jwt";
import {
  getAllUsersService,
  getUserById,
  updateUserRoleService,
} from "../services/userService";
import { redis } from "../config/redis";
import cloudinary from "cloudinary";
import universityModel from "../models/university.model";
import facultyModel from "../models/faculty.model";
import departmentModel from "../models/department.model";
import professorModel from "../models/professor.model";
import studentModel from "../models/students.model";

// Register user
interface IRegistrationBody {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

export const registrationUser = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return next(new ErrorHandler("All fields are required", 400));
      }

      const foundEmailOne = await universityModel.findOne({ email });
      const foundEmailTwo = await userModel.findOne({ email });

      if (foundEmailOne || foundEmailTwo) {
        return next(new ErrorHandler("Email already exist ", 400));
      }

      const user: IRegistrationBody = {
        name,
        email,
        password,
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

export const activateUser = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { activation_token, activation_code } =
        req.body as IActivationRequset;

      const newUser: { user: IUser; activationCode: string } = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET as Secret
      ) as { user: IUser; activationCode: string };

      if (newUser.activationCode !== activation_code) {
        return next(new ErrorHandler(`Invalid activation code`, 400));
      }

      const { name, email, password } = newUser.user;

      const foundEmail = await userModel.findOne({ email });

      if (foundEmail) {
        return next(new ErrorHandler(`Email already exist`, 400));
      }

      const user = await userModel.create({
        name,
        email,
        password,
      });

      res.status(201).json({
        success: true,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Login user
interface ILoginRequest {
  email: string;
  password: string;
}

export const loginUser = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body as ILoginRequest;

      if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password", 400));
      }

      const user = await userModel.findOne({ email }).select("+password");
      const userUniversity = await universityModel
        .findOne({ email })
        .select("+password");
      const userFaculty = await facultyModel
        .findOne({ email })
        .select("+password");
      const userDepartment = await departmentModel
        .findOne({ email })
        .select("+password");
      const userProfessor = await professorModel
        .findOne({ email })
        .select("+password");
      const userStudent = await studentModel
        .findOne({ email })
        .select("+password");

      if (
        !user &&
        !userUniversity &&
        !userFaculty &&
        !userDepartment &&
        !userProfessor &&
        !userStudent
      ) {
        return next(new ErrorHandler("Invaild email or password", 400));
      }

      if (user) {
        const isPassword = await user.comparePassword(password);
        if (!isPassword) {
          return next(new ErrorHandler("Invaild email or password", 400));
        }
        sendToken(user, 200, res);
      } else if (userUniversity) {
        const isPasswordUniversity = await userUniversity.comparePassword(
          password
        );

        if (!isPasswordUniversity) {
          return next(new ErrorHandler("Invaild email or password", 400));
        }

        sendTokenUniversity(userUniversity, 200, res);
      } else if (userFaculty) {
        const isPasswordFaculty = await userFaculty.comparePassword(password);

        if (!isPasswordFaculty) {
          return next(new ErrorHandler("Invaild email or password", 400));
        }

        sendTokenFaculty(userFaculty, 200, res);
      } else if (userDepartment) {
        const isPasswordDepartment = await userDepartment.comparePassword(
          password
        );

        if (!isPasswordDepartment) {
          return next(new ErrorHandler("Invaild email or password", 400));
        }

        sendTokenDepartment(userDepartment, 200, res);
      } else if (userProfessor) {
        const isPasswordProfessor = await userProfessor.comparePassword(
          password
        );

        if (!isPasswordProfessor) {
          return next(new ErrorHandler("Invaild email or password", 400));
        }

        sendTokenProfessor(userProfessor, 200, res);
      } else if (userStudent) {
        const isPasswordStudent = await userStudent.comparePassword(password);

        if (!isPasswordStudent) {
          return next(new ErrorHandler("Invaild email or password", 400));
        }

        sendTokenStudent(userStudent, 200, res);
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Logout user
export const LogoutUser = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.cookie("access_token", "", { maxAge: 1 });
      res.cookie("refresh_token", "", { maxAge: 1 });
      const userId = req.user?._id || "";
      redis.del(userId);

      res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Update access token
export const updateAccessToken = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refresh_token = req.cookies.refresh_token as string;

      const decoded = jwt.verify(
        refresh_token,
        process.env.REFRESH_TOKEN as string
      ) as JwtPayload;

      const message = "Could not refresh token";

      if (!decoded) {
        return next(new ErrorHandler(message, 400));
      }

      const session = await redis.get(decoded.id as string);

      if (!session) {
        return next(
          new ErrorHandler("Please login to access this resources!", 400)
        );
      }

      const user = JSON.parse(session);

      const accessToken = jwt.sign(
        { id: user._id },
        process.env.ACCESS_TOKEN as string,
        { expiresIn: "5m" }
      );

      const refreshToken = jwt.sign(
        { id: user._id },
        process.env.REFRESH_TOKEN as string,
        { expiresIn: "3d" }
      );

      req.user = user;

      res.cookie("access_token", accessToken, accessTokenOptions);
      res.cookie("refresh_token", refreshToken, refreshTokenOptions);

      await redis.set(user._id, JSON.stringify(user), "EX", 604800); // 7 Days

      return next();
    } catch (error: any) {
      next(new ErrorHandler(error.message, 400));
    }
  }
);

// Get user info
export const getUserInfo = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?._id;

      getUserById(userId, res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Update user info
interface IUpdateUserInfo {
  name: string;
}

export const updateUserInfo = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name } = req.body as IUpdateUserInfo;

      const userId = req.user?._id;

      const user = await userModel.findById(userId);

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

// Update user password
interface IUpdatePassword {
  oldPassword: string;
  newPassword: string;
}

export const updatePassword = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { oldPassword, newPassword } = req.body as IUpdatePassword;

      if (!oldPassword || !newPassword) {
        return next(new ErrorHandler("Please enter old and new password", 400));
      }

      const user = await userModel.findById(req.user?._id).select("+password");

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
interface IUpdateAvatar {
  avatar: string;
}

export const updateProfilePicture = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { avatar } = req.body as IUpdateAvatar;

      const userId = await req.user?._id;

      const user = await userModel.findById(userId);

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
export const getAllUsers = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllUsersService(res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Update user role [user Or admin] -- Only for admin
export const updateUserRole = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, role } = req.body;
      const isUserExist = await userModel.findOne({ email });
      if (isUserExist) {
        const id = isUserExist._id;
        updateUserRoleService(res, id, role);
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

// Delete User -- Only for admin
export const deleteUser = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const user = await userModel.findById(id);

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
