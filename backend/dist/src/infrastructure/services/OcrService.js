"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OcrService = void 0;
const AadhaarOCRParser_1 = require("../../shared/utils/AadhaarOCRParser");
const SharpProcessor_1 = require("../../shared/utils/SharpProcessor");
const GoogleVisionService_1 = require("./GoogleVisionService");
class OcrService {
    processImages(frontImageBuffer, backImageBuffer) {
        return __awaiter(this, void 0, void 0, function* () {
            // Using sharp to
            const frontImage = yield (0, SharpProcessor_1.preprocessImage)(frontImageBuffer);
            const backImage = yield (0, SharpProcessor_1.preprocessImage)(backImageBuffer);
            // Extract OCR text
            const frontText = yield (0, GoogleVisionService_1.extractTextFromGoogleVision)(frontImage);
            const backText = yield (0, GoogleVisionService_1.extractTextFromGoogleVision)(backImage);
            const frontData = (0, AadhaarOCRParser_1.parseAadhaarOCRData)(frontText);
            const backData = (0, AadhaarOCRParser_1.parseAadhaarOCRData)(backText);
            if (!frontData.aadhaarNumber ||
                !backText.includes("Unique Identification Authority of India")) {
                return { message: "Invalid Image" };
            }
            const ocrResult = {
                name: frontData.name,
                dob: frontData.dob,
                gender: frontData.gender,
                aadhaarNumber: frontData.aadhaarNumber,
                address: backData.address,
                pincode: backData.pincode,
            };
            return ocrResult;
        });
    }
}
exports.OcrService = OcrService;
