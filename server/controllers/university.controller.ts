import { Request, Response, NextFunction } from "express";
import universityModel, { IUniversity } from "../models/university.model";
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
  sendTokenUniversity,
} from "../config/jwt";
import {
  getAllUsersUniversityService,
  getUserById,
  updateUserUniversityRoleService,
} from "../services/userService";
import { redis } from "../config/redis";
import cloudinary from "cloudinary";
import userModel from "../models/user.model";

// Register user university
interface IRegistrationUniversityBody {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  userCreatedById: string;
}

export const registrationUserUniversity = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password, userCreatedById } = req.body;

      if (!name || !email || !password || !userCreatedById) {
        return next(new ErrorHandler("All fields are required", 400));
      }

      const foundEmailOne = await universityModel.findOne({ email });
      const foundEmailTwo = await userModel.findOne({ email });

      if (foundEmailOne || foundEmailTwo) {
        return next(new ErrorHandler("Email already exist ", 400));
      }

      const user: IRegistrationUniversityBody = {
        name,
        email,
        password,
        userCreatedById,
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

// Activate user university
interface IActivationRequset {
  activation_token: string;
  activation_code: string;
}

export const activateUserUniversity = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { activation_token, activation_code } =
        req.body as IActivationRequset;

      const newUser: { user: IUniversity; activationCode: string } = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET as Secret
      ) as { user: IUniversity; activationCode: string };

      if (newUser.activationCode !== activation_code) {
        return next(new ErrorHandler(`Invalid activation code`, 400));
      }

      const { name, email, password, userCreatedById } = newUser.user;

      const foundEmail = await universityModel.findOne({ email });

      if (foundEmail) {
        return next(new ErrorHandler(`Email already exist`, 400));
      }

      const user = await universityModel.create({
        name,
        email,
        password,
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

// Login user university
interface IUniversityLoginRequest {
  email: string;
  password: string;
}

export const loginUserUniversity = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body as IUniversityLoginRequest;

      if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password", 400));
      }

      const user = await universityModel.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("Invaild email or password", 400));
      }

      const isPassword = await user.comparePassword(password);

      if (!isPassword) {
        return next(new ErrorHandler("Invaild email or password", 400));
      }

      sendTokenUniversity(user, 200, res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// Logout user
export const LogoutUserUniversity = CatchAsyncErrors(
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
        { expiresIn: "5d" }
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
export const getUserUniversityInfo = CatchAsyncErrors(
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
interface IUpdateUserUniversityInfo {
  name: string;
}

export const updateUserUniversityInfo = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name } = req.body as IUpdateUserUniversityInfo;

      const userId = req.user?._id;

      const user = await universityModel.findById(userId);

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

// Update user university password
interface IUpdateuniversityPassword {
  oldPassword: string;
  newPassword: string;
}

export const updateUniversityPassword = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { oldPassword, newPassword } =
        req.body as IUpdateuniversityPassword;

      if (!oldPassword || !newPassword) {
        return next(new ErrorHandler("Please enter old and new password", 400));
      }

      const user = await universityModel
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
interface IUpdateAvatarUniversity {
  avatar: string;
}

export const updateProfilePictureUniversity = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { avatar } = req.body as IUpdateAvatarUniversity;

      const userId = await req.user?._id;

      const user = await universityModel.findById(userId);

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
export const getAllUsersUniversity = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllUsersUniversityService(res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Update user role [user Or admin] -- Only for admin
export const updateUserUniversityRole = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, role } = req.body;
      const isUserExist = await universityModel.findOne({ email });
      if (isUserExist) {
        const id = isUserExist._id;
        updateUserUniversityRoleService(res, id, role);
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
export const deleteUserUniversity = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const user = await universityModel.findById(id);

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
