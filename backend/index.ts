import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import ocrRoute from "./src/interfaces/http/routes/OcrRoute";
import recordRoute from "./src/interfaces/http/routes/RecordRoutes";
import { connectDatabase } from "./src/infrastructure/database/connection";
import AppConfig from "./src/infrastructure/config/AppConfig";

import path from "path";
import fs from "fs";

const app = express();
dotenv.config();

const PORT = AppConfig.port;

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

if (process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
  const credPath = path.join(__dirname, "google-credentials.json");
  fs.writeFileSync(credPath, process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);
  process.env.GOOGLE_APPLICATION_CREDENTIALS = credPath;
}

app.use(express.json());

app.use("/", ocrRoute);
app.use("/", recordRoute);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

connectDatabase();

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
