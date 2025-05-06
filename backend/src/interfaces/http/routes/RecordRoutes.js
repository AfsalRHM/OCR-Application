"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const RecordController_1 = require("../controllers/RecordController");
const ValidateRecordInput_1 = require("../middleware/ValidateRecordInput");
const validateRecordSearch_1 = require("../middleware/validateRecordSearch");
const recordRoute = express_1.default.Router();
recordRoute.post("/record", ValidateRecordInput_1.validateRecordInput, RecordController_1.saveRecordController);
recordRoute.post("/record/fetch", validateRecordSearch_1.validateRecordSearch, RecordController_1.getRecordHandler);
exports.default = recordRoute;
