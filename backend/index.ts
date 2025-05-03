import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
dotenv.config();

app.use(
  cors({
    origin: ["http:localhost:5173"],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
