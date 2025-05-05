import { ocrDataType } from "../../shared/types/OcrDataType";

export interface SaveRecordRequestDTO {
  name: string;
  password: string;
  content: ocrDataType;
}

export interface SaveRecordResponseDTO {
  message: string;
}
