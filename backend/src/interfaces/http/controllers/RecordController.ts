import { Request, Response } from "express";
import { SaveRecordUseCase } from "../../../application/use-cases/SaveRecordUseCase";
import { RecordRepository } from "../../../infrastructure/database/repositories/RecordRepository";
import { GetRecordUseCase } from "../../../application/use-cases/GetRecordUseCase";

const repository = new RecordRepository();
const saveRecordUseCase = new SaveRecordUseCase(repository);
const getRecordUseCase = new GetRecordUseCase(repository);

export const saveRecordController = async (req: Request, res: Response) => {
  try {
    const { recordName, recordPassword, recordData } = req.body;
    console.log("Hello is here working and fine");
    
    const result = await saveRecordUseCase.execute({
      name: recordName,
      password: recordPassword,
      content: recordData,
    });
    res.status(200).json({
      status: true,
      result,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getRecordHandler = async (req: Request, res: Response) => {
  try {
    const { enteredName, enteredPassword } = req.body;
    const result = await getRecordUseCase.execute({
      name: enteredName,
      password: enteredPassword,
    });
    res.status(200).json({ status: true, content: result.content });
  } catch (error: any) {
    res.status(400).json({ status: false, message: error.message });
  }
};
