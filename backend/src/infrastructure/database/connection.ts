import mongoose from "mongoose";
import AppConfig from "../config/AppConfig";

export const connectDatabase = async () => {
  try {
    await mongoose.connect(AppConfig.mongoUri);
    console.log("🟢 MongoDB connected");
  } catch (error) {
    console.error("🔴 MongoDB connection failed:", error);
    process.exit(1);
  }
};
