"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    port: process.env.PORT || 8000,
    mongoUri: process.env.MONGO_URI || "mongodb+srv://afsalrahmanm25:SV09AOyoAX9EZ8Xh@cluster0.o4dnykv.mongodb.net/OCR_Application?retryWrites=true&w=majority&appName=Cluster0",
};
