import { ocrDataType } from "../interfaces/MainPage";
import axiosInstance from "./axiosInstance";

export const fetchDataFromAadharPhotos = (fromData: FormData) => {
  return axiosInstance.post("/", fromData);
};

export const saveRecordData = (fromData: {
  recordName: string;
  recordPassword: string;
  recordData: ocrDataType;
}) => {
  return axiosInstance.post("/record", fromData);
};

export const getRecordData = (data: {
  enteredName: string;
  enteredPassword: string;
}) => {
  return axiosInstance.post("/record/fetch", data);
};
