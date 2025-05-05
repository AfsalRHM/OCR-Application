import { AadhaarOCRResponseDTO } from "../../application/dto/AadhaarOCRDTO";

export interface IocrService {
  processImages(frontImage: Buffer, backImage: Buffer): Promise<AadhaarOCRResponseDTO>;
}
