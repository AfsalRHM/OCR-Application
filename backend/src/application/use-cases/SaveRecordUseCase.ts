import { IRecordRepository } from "../../domain/repositories/IRecordRepository";
import {
  SaveRecordRequestDTO,
  SaveRecordResponseDTO,
} from "../dto/SaveRecordDTO";
import { Record } from "../../domain/entities/Record";

import { hashPassword } from "../../shared/utils/HashPassword";

export class SaveRecordUseCase {
  constructor(private recordRepository: IRecordRepository) {}

  async execute(data: SaveRecordRequestDTO): Promise<SaveRecordResponseDTO> {
    const hashedPassword = hashPassword(data.password);
    const record = new Record(data.name, hashedPassword, data.content);
    await this.recordRepository.save(record);

    return { message: "Record saved successfully" };
  }
}
