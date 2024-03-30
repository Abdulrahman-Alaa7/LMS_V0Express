import express from "express";
import {
  activateUserFaculty,
  deleteUserFaculty,
  getAllUsersFaculty,
  registrationUserFaculty,
  updateFacultyPassword,
  updateProfilePictureFaculty,
  updateUserFacultyInfo,
  updateUserFacultyRole,
} from "../controllers/faculty.controller";
import { authorizeRole, isAuthenticated } from "../middleware/auth";
const userFacultyRouter = express.Router();

userFacultyRouter.post(
  "/registration-faculty",
  isAuthenticated,
  authorizeRole("university"),
  registrationUserFaculty
);

userFacultyRouter.post(
  "/activation-faculty",
  isAuthenticated,
  authorizeRole("university"),
  activateUserFaculty
);

userFacultyRouter.put(
  "/update-user-faculty",
  isAuthenticated,
  authorizeRole("faculty"),
  updateUserFacultyInfo
);

userFacultyRouter.put(
  "/update-password-faculty",
  isAuthenticated,
  authorizeRole("faculty"),
  updateFacultyPassword
);

userFacultyRouter.put(
  "/update-avatar-faculty",
  isAuthenticated,
  authorizeRole("faculty"),
  updateProfilePictureFaculty
);

userFacultyRouter.get(
  "/get-all-users-faculty",
  isAuthenticated,
  authorizeRole("university", "manger"),
  getAllUsersFaculty
);

userFacultyRouter.put(
  "/update-user-role-faculty",
  isAuthenticated,
  authorizeRole("university"),
  updateUserFacultyRole
);

userFacultyRouter.delete(
  "/delete-user-faculty/:id",
  isAuthenticated,
  authorizeRole("university"),
  deleteUserFaculty
);

export default userFacultyRouter;
