import express from "express";
import {
  deleteCourse,
  editCourse,
  getAllCourses,
  getAllCoursesAdmin,
  getCourseByValidUser,
  getSingleCourse,
  uploadCourse,
} from "../controllers/course.controller";
import { authorizeRole, isAuthenticated } from "../middleware/auth";
const courseRouter = express.Router();

courseRouter.post(
  "/upload-course",
  isAuthenticated,
  authorizeRole("professor"),
  uploadCourse
);

courseRouter.put(
  "/edit-course/:id",
  isAuthenticated,
  authorizeRole("professor"),
  editCourse
);

courseRouter.get("/course/:id", isAuthenticated, getSingleCourse);
// Without purchased
courseRouter.get("/all-courses", isAuthenticated, getAllCourses);

courseRouter.get(
  "/get-course-content/:id",
  isAuthenticated,
  getCourseByValidUser
);

// For Admins
courseRouter.get(
  "/get-all-courses",
  isAuthenticated,
  authorizeRole("professor", "manger"),
  getAllCoursesAdmin
);

courseRouter.delete(
  "/delete-course/:id",
  isAuthenticated,
  authorizeRole("professor"),
  deleteCourse
);

export default courseRouter;
