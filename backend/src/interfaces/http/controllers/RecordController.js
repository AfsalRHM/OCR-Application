"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecordHandler = exports.saveRecordController = void 0;
const SaveRecordUseCase_1 = require("../../../application/use-cases/SaveRecordUseCase");
const RecordRepository_1 = require("../../../infrastructure/database/repositories/RecordRepository");
const GetRecordUseCase_1 = require("../../../application/use-cases/GetRecordUseCase");
const repository = new RecordRepository_1.RecordRepository();
const saveRecordUseCase = new SaveRecordUseCase_1.SaveRecordUseCase(repository);
const getRecordUseCase = new GetRecordUseCase_1.GetRecordUseCase(repository);
const saveRecordController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { recordName, recordPassword, recordData } = req.body;
        const result = yield saveRecordUseCase.execute({
            name: recordName,
            password: recordPassword,
            content: recordData,
        });
        res.status(200).json({
            status: true,
            result,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Something went wrong", error });
    }
});
exports.saveRecordController = saveRecordController;
const getRecordHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { enteredName, enteredPassword } = req.body;
        const result = yield getRecordUseCase.execute({
            name: enteredName,
            password: enteredPassword,
        });
        res.status(200).json({ status: true, content: result.content });
    }
    catch (error) {
        res.status(400).json({ status: false, message: error.message });
    }
});
exports.getRecordHandler = getRecordHandler;
