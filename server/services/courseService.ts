import { Response } from "express";
import courseModel from "../models/course.model";
import { CatchAsyncErrors } from "../middleware/catchAsyncErrors";

// Create course
export const createCourse = CatchAsyncErrors(
  async (data: any, res: Response) => {
    const course = await courseModel.create(data);
    res.status(201).json({
      success: true,
      course,
    });
  }
);

// Get all courses
export const getAllCoursesService = async (res: Response) => {
  const courses = await courseModel.find().sort({ createdAt: -1 });

  res.status(201).json({
    success: true,
    courses,
  });
};
