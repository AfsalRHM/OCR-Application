import express from "express";
import {
  getRecordHandler,
  saveRecordController,
} from "../controllers/RecordController";
import { validateRecordInput } from "../middleware/ValidateRecordInput";
import { validateRecordSearch } from "../middleware/validateRecordSearch";

const recordRoute = express.Router();

recordRoute.post("/record", validateRecordInput, saveRecordController);
recordRoute.post("/record/fetch", validateRecordSearch, getRecordHandler);

export default recordRoute;
