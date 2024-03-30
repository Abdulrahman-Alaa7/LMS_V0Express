import express from "express";
import {
  LogoutUserUniversity,
  activateUserUniversity,
  deleteUserUniversity,
  getAllUsersUniversity,
  getUserUniversityInfo,
  loginUserUniversity,
  registrationUserUniversity,
  updateUniversityPassword,
  updateProfilePictureUniversity,
  updateUserUniversityInfo,
  updateUserUniversityRole,
} from "../controllers/university.controller";
import { authorizeRole, isAuthenticated } from "../middleware/auth";
const userUniversityRouter = express.Router();

userUniversityRouter.post(
  "/registration-university",
  isAuthenticated,
  authorizeRole("manger"),
  registrationUserUniversity
);

userUniversityRouter.post(
  "/activation-university",
  isAuthenticated,
  authorizeRole("manger"),
  activateUserUniversity
);

userUniversityRouter.put(
  "/update-user-university",
  isAuthenticated,
  authorizeRole("university"),
  updateUserUniversityInfo
);

userUniversityRouter.put(
  "/update-password-university",
  isAuthenticated,
  authorizeRole("university"),
  updateUniversityPassword
);

userUniversityRouter.put(
  "/update-avatar-university",
  isAuthenticated,
  authorizeRole("university"),
  updateProfilePictureUniversity
);

userUniversityRouter.get(
  "/get-all-users-university",
  isAuthenticated,
  authorizeRole("manger"),
  getAllUsersUniversity
);

userUniversityRouter.put(
  "/update-user-role-university",
  isAuthenticated,
  authorizeRole("manger"),
  updateUserUniversityRole
);

userUniversityRouter.delete(
  "/delete-user-university/:id",
  isAuthenticated,
  authorizeRole("manger"),
  deleteUserUniversity
);

export default userUniversityRouter;
