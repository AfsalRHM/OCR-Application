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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractTextFromGoogleVision = extractTextFromGoogleVision;
const vision_1 = __importDefault(require("@google-cloud/vision"));
const client = new vision_1.default.ImageAnnotatorClient();
function extractTextFromGoogleVision(buffer) {
    return __awaiter(this, void 0, void 0, function* () {
        const [result] = yield client.textDetection({ image: { content: buffer } });
        const detections = result.textAnnotations;
        if (!detections || detections.length === 0 || !detections[0].description) {
            return "";
        }
        return detections[0].description;
    });
}
