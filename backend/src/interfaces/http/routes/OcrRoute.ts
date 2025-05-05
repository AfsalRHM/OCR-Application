import express from "express";
import multer from "multer";
import { OcrController } from "../controllers/OcrController";

const ocrRoute = express.Router();

const upload = multer()


ocrRoute.post("/", upload.fields([
    { name: "adhaarFront", maxCount: 1 },
    { name: "adhaarBack", maxCount: 1 }
  ]), OcrController.ocrFromAadhaarImages);

export default ocrRoute;