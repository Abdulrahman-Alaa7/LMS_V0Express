import { GoogleGenerativeAI } from "@google/generative-ai";
import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "../config/ErrorHandler";
import { CatchAsyncErrors } from "../middleware/catchAsyncErrors";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// Main Chat Ai
export const GeminiChat = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const chat = model.startChat({
        history: req.body.history,
      });

      const msg = req.body.message;
      const result = await chat.sendMessage(msg);
      const response = await result.response;
      const text = response.text();
      res.status(200).send(text);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
