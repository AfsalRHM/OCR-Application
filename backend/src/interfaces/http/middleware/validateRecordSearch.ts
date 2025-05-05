import { Request, Response, NextFunction } from "express";
import * as yup from "yup";

const recordSchema = yup.object().shape({
  enteredName: yup
    .string()
    .required("Record name is required"),
    enteredPassword: yup
    .string()
    .required("Password is required")
    });

export const validateRecordSearch = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await recordSchema.validate(req.body);
    next();
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
