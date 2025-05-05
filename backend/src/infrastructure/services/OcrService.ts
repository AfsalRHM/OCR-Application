import { AadhaarOCRResponseDTO } from "../../application/dto/AadhaarOCRDTO";
import { IocrService } from "../../domain/repositories/IocrService";
import { parseAadhaarOCRData } from "../../shared/utils/AadhaarOCRParser";
import { preprocessImage } from "../../shared/utils/SharpProcessor";
import { extractTextFromGoogleVision } from "./GoogleVisionService";

export class OcrService implements IocrService {
  async processImages(
    frontImageBuffer: Buffer,
    backImageBuffer: Buffer
  ): Promise<AadhaarOCRResponseDTO> {
    // Using sharp to 
    const frontImage = await preprocessImage(frontImageBuffer);
    const backImage = await preprocessImage(backImageBuffer);

    // Extract OCR text
    const frontText = await extractTextFromGoogleVision(frontImage);
    const backText = await extractTextFromGoogleVision(backImage);

    const frontData = parseAadhaarOCRData(frontText);
    const backData = parseAadhaarOCRData(backText);

    const ocrResult = {
      name: frontData.name,
      dob: frontData.dob,
      gender: frontData.gender,
      aadhaarNumber: frontData.aadhaarNumber,
      address: backData.address,
      pincode: backData.pincode,
    };

    return ocrResult;
  }
}
