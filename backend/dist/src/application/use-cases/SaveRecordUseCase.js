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
exports.SaveRecordUseCase = void 0;
const Record_1 = require("../../domain/entities/Record");
const HashPassword_1 = require("../../shared/utils/HashPassword");
class SaveRecordUseCase {
    constructor(recordRepository) {
        this.recordRepository = recordRepository;
    }
    execute(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const nameAlreadyExists = yield this.recordRepository.existsByName(data.name);
            console.log('THis is the working', nameAlreadyExists);
            if (nameAlreadyExists) {
                console.log('Error is throwing');
                throw new Error("Record with this name already exists.");
            }
            const hashedPassword = (0, HashPassword_1.hashPassword)(data.password);
            const record = new Record_1.Record(data.name, hashedPassword, data.content);
            yield this.recordRepository.save(record);
            return { message: "Record saved successfully" };
        });
    }
}
exports.SaveRecordUseCase = SaveRecordUseCase;
