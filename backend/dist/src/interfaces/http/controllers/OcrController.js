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
exports.OcrController = void 0;
const AadhaarOCRUseCase_1 = require("../../../application/use-cases/AadhaarOCRUseCase");
const OcrService_1 = require("../../../infrastructure/services/OcrService");
class OcrController {
    static ocrFromAadhaarImages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const files = req.files;
            const frontImage = (_a = files === null || files === void 0 ? void 0 : files["adhaarFront"]) === null || _a === void 0 ? void 0 : _a[0];
            const backImage = (_b = files === null || files === void 0 ? void 0 : files["adhaarBack"]) === null || _b === void 0 ? void 0 : _b[0];
            if (!frontImage || !backImage) {
                res.status(400).json({ message: "Missing Aadhaar images" });
                return;
            }
            const useCase = new AadhaarOCRUseCase_1.AadhaarOCRUseCase(new OcrService_1.OcrService());
            const result = yield useCase.execute({
                frontImageBuffer: frontImage.buffer,
                backImageBuffer: backImage.buffer,
            });
            res
                .status(200)
                .json({ status: true, data: result, message: "Parsing Successfull" });
        });
    }
}
exports.OcrController = OcrController;
