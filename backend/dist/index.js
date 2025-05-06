"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const OcrRoute_1 = __importDefault(require("./src/interfaces/http/routes/OcrRoute"));
const RecordRoutes_1 = __importDefault(require("./src/interfaces/http/routes/RecordRoutes"));
const connection_1 = require("./src/infrastructure/database/connection");
const AppConfig_1 = __importDefault(require("./src/infrastructure/config/AppConfig"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
dotenv_1.default.config();
console.log(process.env.PORT, "This is the port");
const PORT = process.env.PORT || AppConfig_1.default.port;
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173", "https://aadhaar-ocr-application.vercel.app"],
    credentials: true,
}));
if (process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
    const credPath = path_1.default.join(__dirname, "google-credentials.json");
    fs_1.default.writeFileSync(credPath, process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);
    process.env.GOOGLE_APPLICATION_CREDENTIALS = credPath;
}
app.use(express_1.default.json());
app.use("/", OcrRoute_1.default);
app.use("/", RecordRoutes_1.default);
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
(0, connection_1.connectDatabase)();
app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
});
