import { app } from "../app";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbUrl: string = process.env.DBURL || "";

const port = process.env.PORT;

export const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl).then(() => {
      console.log(`Database is connecting..`);
      app.listen(port, () => {
        console.log(`Server is listrning at ${port}`);
      });
    });
  } catch (error: any) {
    console.log(`Error from Database ${error.message}`);
    setTimeout(connectDB, 5000);
  }
};
