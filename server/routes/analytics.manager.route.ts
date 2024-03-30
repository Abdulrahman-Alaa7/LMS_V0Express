import express from "express";
import {
  getUsersAnalytics,
  getUniversitiesAnalytics,
  getFaculiesAnalytics,
  getDepartmentsAnalytics,
  getProfessorsAnalytics,
  getStudentsAnalytics,
  getCoursesAnalytics,
  getOrdersAnalytics,
} from "../controllers/managersAnalytics.controller";
import { authorizeRole, isAuthenticated } from "../middleware/auth";
const analyticsRouter = express.Router();

analyticsRouter.get(
  "/get-managers-analytics",
  isAuthenticated,
  authorizeRole("manger"),
  getUsersAnalytics
);
analyticsRouter.get(
  "/get-universities-analytics",
  isAuthenticated,
  authorizeRole("manger"),
  getUniversitiesAnalytics
);
analyticsRouter.get(
  "/get-faculties-analytics",
  isAuthenticated,
  authorizeRole("manger"),
  getFaculiesAnalytics
);
analyticsRouter.get(
  "/get-departments-analytics",
  isAuthenticated,
  authorizeRole("manger"),
  getDepartmentsAnalytics
);
analyticsRouter.get(
  "/get-professors-analytics",
  isAuthenticated,
  authorizeRole("manger"),
  getProfessorsAnalytics
);
analyticsRouter.get(
  "/get-students-analytics",
  isAuthenticated,
  authorizeRole("manger"),
  getStudentsAnalytics
);
analyticsRouter.get(
  "/get-courses-analytics",
  isAuthenticated,
  authorizeRole("manger"),
  getCoursesAnalytics
);
analyticsRouter.get(
  "/get-orders-analytics",
  isAuthenticated,
  authorizeRole("manger"),
  getOrdersAnalytics
);

export default analyticsRouter;
