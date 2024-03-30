import express from "express";
import { GeminiChat } from "../controllers/chatAi.controller";
import { authorizeRole, isAuthenticated } from "../middleware/auth";
const chatAiRouter = express.Router();

chatAiRouter.post("/gemini", GeminiChat);

export default chatAiRouter;
