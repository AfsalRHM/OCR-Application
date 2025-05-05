import { Request, Response } from "express";
import { AadhaarOCRUseCase } from "../../../application/use-cases/AadhaarOCRUseCase";
import { OcrService } from "../../../infrastructure/services/OcrService";
import { AadhaarUploadFields } from "../../../application/dto/AadhaarOCRDTO";

export class OcrController {
  static async ocrFromAadhaarImages(req: Request, res: Response) {
    const files = req.files as AadhaarUploadFields;
    const frontImage = files?.["adhaarFront"]?.[0];
    const backImage = files?.["adhaarBack"]?.[0];

    if (!frontImage || !backImage) {
      res.status(400).json({ message: "Missing Aadhaar images" });
      return;
    }

    const useCase = new AadhaarOCRUseCase(new OcrService());
    const result = await useCase.execute({
      frontImageBuffer: frontImage.buffer,
      backImageBuffer: backImage.buffer,
    });

    res
      .status(200)
      .json({ status: true, data: result, message: "Parsing Successfull" });
  }
}
