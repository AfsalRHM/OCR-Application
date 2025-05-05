import { ocrDataType } from "../../shared/types/OcrDataType";

export class Record {
  constructor(
    public readonly name: string,
    public readonly password: string,
    public readonly content: ocrDataType
  ) {}
}
