import express from "express";
import { authorizeRole, isAuthenticated } from "../middleware/auth";
import {
  activateUserProfessor,
  registrationUserProfessor,
  deleteUserProfessor,
  getAllUsersProfessor,
  updateProfessorPassword,
  updateProfilePictureProfessor,
  updateUserProfessorInfo,
  updateUserProfessorRole,
  getAllUsersDepartmentProf,
} from "../controllers/professor.controller";
const userProfessorRouter = express.Router();

userProfessorRouter.post(
  "/registration-professor",
  isAuthenticated,
  authorizeRole("department"),
  registrationUserProfessor
);

userProfessorRouter.post(
  "/activation-professor",
  isAuthenticated,
  authorizeRole("department"),
  activateUserProfessor
);

userProfessorRouter.put(
  "/update-user-professor",
  isAuthenticated,
  authorizeRole("professor"),
  updateUserProfessorInfo
);

userProfessorRouter.put(
  "/update-password-professor",
  isAuthenticated,
  authorizeRole("professor"),
  updateProfessorPassword
);

userProfessorRouter.put(
  "/update-avatar-professor",
  isAuthenticated,
  authorizeRole("professor"),
  updateProfilePictureProfessor
);

userProfessorRouter.get(
  "/get-all-users-professor",
  isAuthenticated,
  authorizeRole("department", "manger"),
  getAllUsersProfessor
);

userProfessorRouter.put(
  "/update-user-role-professor",
  isAuthenticated,
  authorizeRole("department"),
  updateUserProfessorRole
);

userProfessorRouter.delete(
  "/delete-user-professor/:id",
  isAuthenticated,
  authorizeRole("department"),
  deleteUserProfessor
);

userProfessorRouter.get(
  "/get-all-users-department-prof",
  isAuthenticated,
  authorizeRole("professor"),
  getAllUsersDepartmentProf
);

export default userProfessorRouter;
