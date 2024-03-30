import { Request, Response, NextFunction } from "express";
import courseModel, { ICourse } from "../models/course.model";
import { ErrorHandler } from "../config/ErrorHandler";
import { CatchAsyncErrors } from "../middleware/catchAsyncErrors";
import cloudinary from "cloudinary";
import { createCourse, getAllCoursesService } from "../services/courseService";
import { redis } from "../config/redis";
import mongoose from "mongoose";
import ejs from "ejs";
import path from "path";
import sendMail from "../config/sendMail";
// import notificationModel from "../models/notificationModel";
import dotenv from "dotenv";
import studentModel from "../models/students.model";
import departmentModel from "../models/department.model";
dotenv.config();

// Upload course
export const uploadCourse = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const coursePdf = data.coursePdf;

      if (coursePdf) {
        // If user have a pdf
        if (coursePdf?.public_id) {
          // First delete the old pdf
          await cloudinary.v2.uploader.destroy(coursePdf?.public_id);

          const myCloud = await cloudinary.v2.uploader.upload(coursePdf, {
            folder: "pdf",
            resource_type: "raw",
          });

          data.coursePdf = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          };
        } else {
          const myCloud = await cloudinary.v2.uploader.upload(coursePdf, {
            folder: "pdf",
            resource_type: "raw",
          });

          data.coursePdf = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          };
        }
      }

      createCourse(data, res, next);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Edit course
export const editCourse = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      const courseId = req.params.id;
      const coursePdf = data.coursePdf;

      if (coursePdf) {
        // If user have a pdf
        if (coursePdf?.public_id) {
          // First delete the old pdf
          await cloudinary.v2.uploader.destroy(coursePdf?.public_id);

          const myCloud = await cloudinary.v2.uploader.upload(coursePdf, {
            folder: "pdf",
            resource_type: "raw",
          });

          data.coursePdf = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          };
        } else {
          const myCloud = await cloudinary.v2.uploader.upload(coursePdf, {
            folder: "pdf",
            resource_type: "raw",
          });

          data.coursePdf = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          };
        }
      }

      const course = await courseModel.findByIdAndUpdate(
        courseId,
        {
          $set: data,
        },
        { new: true }
      );

      res.status(201).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Get single course -- Without purchasing
export const getSingleCourse = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courseId = req.params.id;

      const isCasheExist = await redis.get(courseId);

      if (isCasheExist) {
        const course = JSON.parse(isCasheExist);

        res.status(200).json({
          success: true,
          course,
        });
      } else {
        const course = await courseModel
          .findById(req.params.id)
          .select(
            "-courseData -quiz -coursePdf -courseName -user.password -user.balance -user.email "
          );

        await redis.set(courseId, JSON.stringify(course), "EX", 604800); // 7 Days

        res.status(200).json({
          success: true,
          course,
        });
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.messgae, 500));
    }
  }
);

// Get all courses -- Without purchasing
export const getAllCourses = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const studentYear = req.user?.studentYearOfStudy;
      const theDepartment = await departmentModel.findById(
        req.user?.userCreatedById
      );
      const theSemester = theDepartment?.semester;

      const courses = await courseModel
        .find({
          yearOfStudy: studentYear,
          semester: theSemester,
          private: false,
        })
        .select(
          "-courseData -quiz -coursePdf -courseName -user.password -user.balance -user.email "
        );

      res.status(200).json({
        success: true,
        courses,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.messgae, 500));
    }
  }
);

// Get course content -- Only valid user
export const getCourseByValidUser = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userCourseList = req.user?.coursesPurchased;
      const courseId = req.params.id;

      const courseExists = userCourseList?.find(
        (course: any) => course._id.toString() === courseId
      );

      if (!courseExists) {
        return next(
          new ErrorHandler("You are not eligible to access this course", 404)
        );
      }

      const course = await courseModel.findById(courseId).select("-user");

      // const content = course?.courseData;
      // const quiz = course?.quiz;
      // const pdfUrl = course?.coursePdf;
      // const pdfName = course?.pdfName;

      res.status(200).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.messgae, 500));
    }
  }
);

// Get All Courses -- Only for admin
export const getAllCoursesAdmin = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllCoursesService(res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Delete Course -- Only fo admin
export const deleteCourse = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const course = await courseModel.findById(id);

      if (!course) {
        return next(new ErrorHandler("Course not found", 404));
      }

      await course.deleteOne({ id });

      await redis.del(id);

      res.status(201).json({
        success: true,
        message: "Course deleted successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
