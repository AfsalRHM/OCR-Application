import { IRecordRepository } from "../../../domain/repositories/IRecordRepository";
import { Record } from "../../../domain/entities/Record";
import RecordModel from "../models/RecordModel";

export class RecordRepository implements IRecordRepository {
  async save(record: Record): Promise<Record> {
    await RecordModel.create(record);
    return record;
  }

  async findByName(name: string): Promise<Record | null> {
    const doc = await RecordModel.findOne({ name });
    if (!doc) return null;
    return new Record(doc.name, doc.password, doc.content);
  }
}
