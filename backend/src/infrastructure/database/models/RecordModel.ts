import mongoose, { Schema } from "mongoose";
import { ocrDataType } from "../../../shared/types/OcrDataType";
import { IRecordDocument } from "../Interfaces/IRecordModel";

// Helper Schema
const ocrDataSchema = new Schema<ocrDataType>(
  {
    name: { type: String, required: true },
    dob: { type: String, required: true },
    gender: { type: String, required: true },
    aadhaarNumber: { type: String, required: true },
    address: { type: String, required: true },
    pincode: { type: String, required: true },
  },
  { _id: false }
);

// Main Schema
const recordSchema: Schema = new Schema<IRecordDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    content: {
      type: ocrDataSchema,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IRecordDocument>("Record", recordSchema);
