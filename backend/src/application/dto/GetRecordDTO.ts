import { ocrDataType } from "../../shared/types/OcrDataType";

export interface GetRecordRequestDTO {
  name: string;
  password: string;
}

export interface GetRecordResponseDTO {
  content: ocrDataType;
  message: string;
}
