"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const OcrController_1 = require("../controllers/OcrController");
const ocrRoute = express_1.default.Router();
const upload = (0, multer_1.default)();
ocrRoute.post("/", upload.fields([
    { name: "adhaarFront", maxCount: 1 },
    { name: "adhaarBack", maxCount: 1 }
]), OcrController_1.OcrController.ocrFromAadhaarImages);
exports.default = ocrRoute;
