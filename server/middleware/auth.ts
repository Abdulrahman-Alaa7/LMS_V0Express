import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ErrorHandler } from "../config/ErrorHandler";
import { CatchAsyncErrors } from "./catchAsyncErrors";
import dotenv from "dotenv";
import { redis } from "../config/redis";
import { updateAccessToken } from "../controllers/user.controller";
dotenv.config();

// Authenticated user
export const isAuthenticated = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const access_token = req.cookies.access_token as string;

    if (!access_token) {
      return next(new ErrorHandler("You are not authenticated!", 400));
    }

    const decoded = jwt.decode(access_token) as JwtPayload;

    if (!decoded) {
      return next(new ErrorHandler("Access token is not valid", 400));
    }

    // console.log("Decoded ID:", decoded.id);

    // Check if the access token is expired
    if (decoded.exp && decoded.exp <= Date.now() / 1000) {
      try {
        await updateAccessToken(req, res, next);
      } catch (error) {
        return next(error);
      }
    } else {
      const user = await redis.get(decoded.id);
      if (!user) {
        return next(
          new ErrorHandler("Please login to access this resource", 400)
        );
      }

      if (user) {
        req.user = JSON.parse(user);
      }

      next();
    }
  }
);

// Validate user role
export const authorizeRole = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role || ""; // Get the user role
    if (!roles.includes(userRole)) {
      return next(
        new ErrorHandler(
          `Role: ${userRole} is not allowed to access this resource`,
          403
        )
      );
    }

    next();
  };
};
