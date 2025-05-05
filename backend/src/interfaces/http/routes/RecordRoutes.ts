import express from "express";
import { saveRecordController } from "../controllers/RecordController";
import { validateRecordInput } from "../middleware/ValidateRecordInput";

const recordRoute = express.Router();

recordRoute.post("/record", validateRecordInput, saveRecordController);

export default recordRoute;
