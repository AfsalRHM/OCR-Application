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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecordRepository = void 0;
const RecordModel_1 = __importDefault(require("../models/RecordModel"));
class RecordRepository {
    save(record) {
        return __awaiter(this, void 0, void 0, function* () {
            yield RecordModel_1.default.create(record);
            return record;
        });
    }
    findByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const record = yield RecordModel_1.default.findOne({ name });
            if (!record)
                return null;
            return {
                password: record.password,
                content: record.content,
            };
        });
    }
    existsByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = yield RecordModel_1.default.exists({ name });
            return !!exists;
        });
    }
}
exports.RecordRepository = RecordRepository;
