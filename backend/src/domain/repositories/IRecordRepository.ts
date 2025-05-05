import { Record } from "../entities/Record";

export interface IRecordRepository {
  save(record: Record): Promise<Record>;
  findByName(name: string): Promise<Record | null>;
}
