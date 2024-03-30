import { NextFunction, Response } from "express";
import { redis } from "../config/redis";
import userModel from "../models/user.model";
import universityModel from "../models/university.model";
import facultyModel from "../models/faculty.model";
import departmentModel from "../models/department.model";
import professorModel from "../models/professor.model";
import studentModel from "../models/students.model";

// Get user by id
export const getUserById = async (id: string, res: Response) => {
  // const user = await userModel.findById(id); From Mongodb
  const userJson = await redis.get(id); // from redis

  if (userJson) {
    const user = JSON.parse(userJson);
    res.status(200).json({
      success: true,
      user,
    });
  }
};

// Get all users
export const getAllUsersService = async (res: Response) => {
  const users = await userModel.find().sort({ createdAt: -1 });

  res.status(201).json({
    success: true,
    users,
  });
};

// Get all users university
export const getAllUsersUniversityService = async (res: Response) => {
  const users = await universityModel.find().sort({ createdAt: -1 });

  res.status(201).json({
    success: true,
    users,
  });
};

// Get all users faculty
export const getAllUsersFacultyService = async (res: Response) => {
  const users = await facultyModel.find().sort({ createdAt: -1 });

  res.status(201).json({
    success: true,
    users,
  });
};

// Get all users department
export const getAllUsersDepartmentService = async (res: Response) => {
  const users = await departmentModel.find().sort({ createdAt: -1 });

  res.status(201).json({
    success: true,
    users,
  });
};

// Get all users department
export const getAllUsersDepartmentProfService = async (res: Response) => {
  const users = await departmentModel.find().sort({ createdAt: -1 });

  res.status(201).json({
    success: true,
    users,
  });
};

// Get all users professors
export const getAllUsersProfessorService = async (res: Response) => {
  const users = await professorModel.find().sort({ createdAt: -1 });

  res.status(201).json({
    success: true,
    users,
  });
};

// Get all users students
export const getAllUsersStudentService = async (res: Response) => {
  const users = await studentModel.find().sort({ createdAt: -1 });

  res.status(201).json({
    success: true,
    users,
  });
};

// Update user role [user Or admin] -- Only for admin
export const updateUserRoleService = async (
  res: Response,
  id: string,
  role: string
) => {
  const user = await userModel.findByIdAndUpdate(id, { role }, { new: true });

  res.status(201).json({
    success: true,
    user,
  });
};

// Update user role [user Or admin] -- Only for admin
export const updateUserUniversityRoleService = async (
  res: Response,
  id: string,
  role: string
) => {
  const user = await universityModel.findByIdAndUpdate(
    id,
    { role },
    { new: true }
  );

  res.status(201).json({
    success: true,
    user,
  });
};

// Update user role [user Or admin] -- Only for admin
export const updateUserFacultyRoleService = async (
  res: Response,
  id: string,
  role: string
) => {
  const user = await facultyModel.findByIdAndUpdate(
    id,
    { role },
    { new: true }
  );

  res.status(201).json({
    success: true,
    user,
  });
};

// Update user role [user Or admin] -- Only for admin
export const updateUserDepartmentRoleService = async (
  res: Response,
  id: string,
  role: string
) => {
  const user = await departmentModel.findByIdAndUpdate(
    id,
    { role },
    { new: true }
  );

  res.status(201).json({
    success: true,
    user,
  });
};

// Update user Semester [user Or admin] -- Only for admin
export const updateDepartmentSemesterService = async (
  res: Response,
  id: string,
  semester: number
) => {
  const user = await departmentModel.findByIdAndUpdate(
    id,
    { semester },
    { new: true }
  );
  await redis.set(id, JSON.stringify(user));

  res.status(201).json({
    success: true,
    user,
  });
};

// Update student year by promote button -- Only for admin
export const updateStudentYearByPromoteService = async (
  res: Response,
  id: string,
  studentYearOfStudy: string
) => {
  const user = await studentModel.findByIdAndUpdate(
    id,
    { studentYearOfStudy },
    { new: true }
  );

  res.status(201).json({
    success: true,
    user,
  });
};

// Update student year and name -- Only for admin
export const updateStudentYearAndNameService = async (
  res: Response,
  id: string,
  name: string,
  studentYearOfStudy: string
) => {
  const user = await studentModel.findByIdAndUpdate(
    id,
    { name, studentYearOfStudy },
    { new: true }
  );

  res.status(201).json({
    success: true,
    user,
  });
};

// Update user role [user Or admin] -- Only for admin
export const updateUserProfessorRoleService = async (
  res: Response,
  id: string,
  role: string
) => {
  const user = await professorModel.findByIdAndUpdate(
    id,
    { role },
    { new: true }
  );

  res.status(201).json({
    success: true,
    user,
  });
};

// Update user role [user Or admin] -- Only for admin
export const updateUserStudentRoleService = async (
  res: Response,
  id: string,
  role: string
) => {
  const user = await studentModel.findByIdAndUpdate(
    id,
    { role },
    { new: true }
  );

  res.status(201).json({
    success: true,
    user,
  });
};
