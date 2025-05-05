import mongoose from "mongoose";
import { ocrDataType } from "../../../shared/types/OcrDataType";

export interface IRecordDocument extends Document {
  _id?: mongoose.ObjectId;
  name: string;
  password: string;
  content: ocrDataType;
  createdAt?: Date;
  updatedAt?: Date;
}
