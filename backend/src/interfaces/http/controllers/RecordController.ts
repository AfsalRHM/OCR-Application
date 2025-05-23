import { Request, Response } from "express";
import { SaveRecordUseCase } from "../../../application/use-cases/SaveRecordUseCase";
import { RecordRepository } from "../../../infrastructure/database/repositories/RecordRepository";
import { GetRecordUseCase } from "../../../application/use-cases/GetRecordUseCase";
import { statusCode } from "../../../shared/constants/StatusCodes";

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
    res.status(statusCode.OK).json({
      status: true,
      result,
    });
  } catch (error: any) {
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export const getRecordHandler = async (req: Request, res: Response) => {
  try {
    const { enteredName, enteredPassword } = req.body;
    const result = await getRecordUseCase.execute({
      name: enteredName,
      password: enteredPassword,
    });
    res.status(statusCode.OK).json({ status: true, content: result.content });
  } catch (error: any) {
    res.status(statusCode.BAD_REQUEST).json({ status: false, message: error.message });
  }
};
