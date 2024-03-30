import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
import { ErrorMiddleware } from "./middleware/error";
import userRouter from "./routes/user.route";
import userUniversityRouter from "./routes/university.route";
import userFacultyRouter from "./routes/faculty.route";
import userDepartmentRouter from "./routes/department.route";
import userProfessorRouter from "./routes/professor.route";
import userStudentRouter from "./routes/student.route";
import courseRouter from "./routes/course.route";
import orderRouter from "./routes/order.route";
import chatAiRouter from "./routes/chatAi.route";
import analyticsRouter from "./routes/analytics.manager.route";

export const app = express();

// Body parser
app.use(express.json({ limit: "50mb" }));

// Cookie parser
app.use(cookieParser());

// Cors => cross origin resource sharing
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

// all routes
app.use(
  "/api/v1",
  userRouter,
  userUniversityRouter,
  userFacultyRouter,
  userDepartmentRouter,
  userProfessorRouter,
  userStudentRouter,
  courseRouter,
  orderRouter,
  analyticsRouter,
  chatAiRouter
);

// Testing api
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({
      success: true,
      message: "Hello There!",
    });
  } catch (error) {
    console.log(error);
  }
});

// Unkown route
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} not found`) as any;
  err.statusCode = 404;
  next(err);
});

// Call the ErrorHandler
app.use(ErrorMiddleware);
