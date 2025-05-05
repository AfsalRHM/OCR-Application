import { ocrDataType } from "./MainPage";

export interface ViewDataType {
  ocrData: ocrDataType | null;
  handleClearData: () => void;
}
