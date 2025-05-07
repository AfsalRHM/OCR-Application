import { ocrDataType } from "../../shared/types/OcrDataType";
import { Record } from "../entities/Record";

export interface IRecordRepository {
  save(record: Record): Promise<Record>;
  findByName(name: string): Promise<{ password: string; content: ocrDataType } | null>;
  existsByName(name: string): Promise<boolean>;
}
