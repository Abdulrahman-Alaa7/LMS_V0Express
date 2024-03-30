import express from "express";
import { authorizeRole, isAuthenticated } from "../middleware/auth";
import {
  activateUserStudent,
  registrationUserStudent,
  deleteUserStudent,
  getAllUsersStudent,
  updateStudentPassword,
  updateProfilePictureStudent,
  updateUserStudentInfo,
  updateUserStudentRole,
} from "../controllers/student.controller";
const userStudentRouter = express.Router();

userStudentRouter.post(
  "/registration-student",
  isAuthenticated,
  authorizeRole("department"),
  registrationUserStudent
);

userStudentRouter.post(
  "/activation-student",
  isAuthenticated,
  authorizeRole("department"),
  activateUserStudent
);

userStudentRouter.put(
  "/update-user-student",
  isAuthenticated,
  authorizeRole("student"),
  updateUserStudentInfo
);

userStudentRouter.put(
  "/update-password-student",
  isAuthenticated,
  authorizeRole("student"),
  updateStudentPassword
);

userStudentRouter.put(
  "/update-avatar-student",
  isAuthenticated,
  authorizeRole("student"),
  updateProfilePictureStudent
);

userStudentRouter.get(
  "/get-all-users-student",
  isAuthenticated,
  authorizeRole("department", "manger"),
  getAllUsersStudent
);

userStudentRouter.put(
  "/update-user-role-student",
  isAuthenticated,
  authorizeRole("department"),
  updateUserStudentRole
);

userStudentRouter.delete(
  "/delete-user-student/:id",
  isAuthenticated,
  authorizeRole("department"),
  deleteUserStudent
);

export default userStudentRouter;
