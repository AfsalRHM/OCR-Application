import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT || 8000,
  mongoUri: process.env.MONGO_URI || "mongodb+srv://afsalrahmanm25:SV09AOyoAX9EZ8Xh@cluster0.o4dnykv.mongodb.net/OCR_Application?retryWrites=true&w=majority&appName=Cluster0",
};
