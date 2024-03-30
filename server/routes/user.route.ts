import express from "express";
import {
  LogoutUser,
  activateUser,
  deleteUser,
  getAllUsers,
  getUserInfo,
  loginUser,
  registrationUser,
  updatePassword,
  updateProfilePicture,
  updateUserInfo,
  updateUserRole,
} from "../controllers/user.controller";
import { authorizeRole, isAuthenticated } from "../middleware/auth";
const userRouter = express.Router();

userRouter.post("/login", loginUser);

userRouter.get("/logout", isAuthenticated, LogoutUser);

userRouter.get("/me", isAuthenticated, getUserInfo);

userRouter.post(
  "/registration",
  isAuthenticated,
  authorizeRole("manger"),
  registrationUser
);

userRouter.post(
  "/activation",
  isAuthenticated,
  authorizeRole("manger"),
  activateUser
);

// userRouter.get("/refresh", updateAccessToken);

// userRouter.post("/social-auth", socialAuth);

userRouter.put(
  "/update-user",
  isAuthenticated,
  authorizeRole("manger"),
  updateUserInfo
);

userRouter.put(
  "/update-password",
  isAuthenticated,
  authorizeRole("manger"),
  updatePassword
);

userRouter.put(
  "/update-avatar",
  isAuthenticated,
  authorizeRole("manger"),
  updateProfilePicture
);

userRouter.get(
  "/get-all-users",
  isAuthenticated,
  authorizeRole("manger"),
  getAllUsers
);

userRouter.put(
  "/update-user-role",
  isAuthenticated,
  authorizeRole("manger"),
  updateUserRole
);

userRouter.delete(
  "/delete-user/:id",
  isAuthenticated,
  authorizeRole("manger"),
  deleteUser
);

export default userRouter;
