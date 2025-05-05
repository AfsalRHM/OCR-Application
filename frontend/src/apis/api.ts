import axiosInstance from "./axiosInstance";

export const fetchDataFromAadharPhotos = (fromData: FormData) => {
  return axiosInstance.post("/", fromData);
};
