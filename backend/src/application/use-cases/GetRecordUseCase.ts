import { IRecordRepository } from "../../domain/repositories/IRecordRepository";
import { comparePassword } from "../../shared/utils/ComparePassword";
import { GetRecordRequestDTO, GetRecordResponseDTO } from "../dto/GetRecordDTO";

export class GetRecordUseCase {
  constructor(private recordRepository: IRecordRepository) {}

  async execute(request: GetRecordRequestDTO): Promise<GetRecordResponseDTO> {
    const record = await this.recordRepository.findByName(request.name);
    if (!record) {
      throw new Error("Record not found");
    }

    const isMatch = comparePassword({
      enteredPassword: request.password,
      recordPassword: record.password,
    });
    
    if (!isMatch) {
      throw new Error("Invalid password");
    }

    return { message: "Record finded Successfully", content: record.content };
  }
}
