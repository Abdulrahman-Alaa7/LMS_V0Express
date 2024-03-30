import express from "express";
import { authorizeRole, isAuthenticated } from "../middleware/auth";
import {
  activateUserDepartment,
  registrationUserDepartment,
  deleteUserDepartment,
  getAllUsersDepartment,
  updateDepartmentPassword,
  updateProfilePictureDepartment,
  updateUserDepartmentInfo,
  updateUserDepartmentRole,
  updateDepartmentSemester,
  updateStudentYearByPromote,
  updateStudentYearAndName,
} from "../controllers/department.controller";
const userDepartmentRouter = express.Router();

userDepartmentRouter.post(
  "/registration-department",
  isAuthenticated,
  authorizeRole("faculty"),
  registrationUserDepartment
);

userDepartmentRouter.post(
  "/activation-department",
  isAuthenticated,
  authorizeRole("faculty"),
  activateUserDepartment
);

userDepartmentRouter.put(
  "/update-user-department",
  isAuthenticated,
  authorizeRole("department"),
  updateUserDepartmentInfo
);

userDepartmentRouter.put(
  "/update-password-department",
  isAuthenticated,
  authorizeRole("department"),
  updateDepartmentPassword
);

userDepartmentRouter.put(
  "/update-avatar-department",
  isAuthenticated,
  authorizeRole("department"),
  updateProfilePictureDepartment
);

userDepartmentRouter.get(
  "/get-all-users-department",
  isAuthenticated,
  authorizeRole("faculty", "manger"),
  getAllUsersDepartment
);

userDepartmentRouter.put(
  "/update-user-role-department",
  isAuthenticated,
  authorizeRole("faculty"),
  updateUserDepartmentRole
);
userDepartmentRouter.put(
  "/update-department-semester",
  isAuthenticated,
  authorizeRole("department"),
  updateDepartmentSemester
);

userDepartmentRouter.put(
  "/update-student-year-promote",
  isAuthenticated,
  authorizeRole("department"),
  updateStudentYearByPromote
);

userDepartmentRouter.put(
  "/update-student-year-name",
  isAuthenticated,
  authorizeRole("department"),
  updateStudentYearAndName
);

userDepartmentRouter.delete(
  "/delete-user-department/:id",
  isAuthenticated,
  authorizeRole("faculty"),
  deleteUserDepartment
);

export default userDepartmentRouter;
