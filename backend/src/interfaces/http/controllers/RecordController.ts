import { Request, Response } from "express";
import { SaveRecordUseCase } from "../../../application/use-cases/SaveRecordUseCase";
import { RecordRepository } from "../../../infrastructure/database/repositories/RecordRepository";

const repository = new RecordRepository();
const saveRecordUseCase = new SaveRecordUseCase(repository);

export const saveRecordController = async (req: Request, res: Response) => {
  try {
    const { recordName, recordPassword, recordData } = req.body;
    const result = await saveRecordUseCase.execute({
      name: recordName,
      password: recordPassword,
      content: recordData,
    });
    res.status(200).json({
      status: true,
      result,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};
