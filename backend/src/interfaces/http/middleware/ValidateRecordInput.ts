import { Request, Response, NextFunction } from "express";
import * as yup from "yup";

const recordSchema = yup.object().shape({
  recordName: yup
    .string()
    .required("Record name is required")
    .min(3, "Record name must be at least 3 characters")
    .max(50, "Record name cannot exceed 50 characters"),
  recordPassword: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(15, "Password cannot exceed 15 characters"),
  recordData: yup.object().required("Record data is required"), 
});

export const validateRecordInput = async (
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
