import { Request } from "express";
import { IUser } from "../models/user.model";
import { IUniversity } from "../models/university.model";
import { IProfessor } from "../models/professor.model";
import { IStudent } from "../models/students.model";
export interface MyRequest extends Request {
  user?: any;
}

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export interface StudentRequest extends Request {
  user?: IStudent;
}

export interface professorRequest extends Request {
  user?: IProfessor;
}
