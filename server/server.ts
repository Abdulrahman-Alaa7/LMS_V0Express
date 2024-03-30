import { app } from "./app";
import { connectDB } from "./config/DB";
import http from "http";
import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";
import { initSocketServer } from "./socketServer";
export const server = http.createServer(app);

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

initSocketServer(server);

// Craete server and connection with Database
connectDB();
