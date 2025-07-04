import { IocrService } from "../../domain/repositories/IocrService";
import {
  AadhaarOCRRequestDTO,
  AadhaarOCRResponseDTO,
} from "../dto/AadhaarOCRDTO";

export class AadhaarOCRUseCase {
  constructor(private aadhaarService: IocrService) {}

  async execute(
    data: AadhaarOCRRequestDTO
  ): Promise<AadhaarOCRResponseDTO | { message: string }> {
    return this.aadhaarService.processImages(
      data.frontImageBuffer,
      data.backImageBuffer
    );
  }
}
