import { IRecordRepository } from "../../../domain/repositories/IRecordRepository";
import { Record } from "../../../domain/entities/Record";
import RecordModel from "../models/RecordModel";
import { ocrDataType } from "../../../shared/types/OcrDataType";

export class RecordRepository implements IRecordRepository {
  async save(record: Record): Promise<Record> {
    await RecordModel.create(record);
    return record;
  }

  async findByName(
    name: string
  ): Promise<{ password: string; content: ocrDataType } | null> {
    const record = await RecordModel.findOne({ name });
    if (!record) return null;
    return {
      password: record.password,
      content: record.content,
    };
  }

  async existsByName(name: string): Promise<boolean> {
    const exists = await RecordModel.exists({ name });
    return !!exists;
  }
}
