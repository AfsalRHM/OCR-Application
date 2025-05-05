import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT || 8000,
  mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/secure-data",
};
