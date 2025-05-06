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
exports.GetRecordUseCase = void 0;
const ComparePassword_1 = require("../../shared/utils/ComparePassword");
class GetRecordUseCase {
    constructor(recordRepository) {
        this.recordRepository = recordRepository;
    }
    execute(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const record = yield this.recordRepository.findByName(request.name);
            if (!record) {
                throw new Error("Record not found");
            }
            const isMatch = (0, ComparePassword_1.comparePassword)({
                enteredPassword: request.password,
                recordPassword: record.password,
            });
            if (!isMatch) {
                throw new Error("Invalid password");
            }
            return { message: "Record finded Successfully", content: record.content };
        });
    }
}
exports.GetRecordUseCase = GetRecordUseCase;
