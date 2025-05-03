import axiosInstance from "./axiosInstance";

type fetchDataFromAadharPhotosType = {
  adhaarFront: string;
  adhaarBack: string;
};

export const fetchDataFromAadharPhotos = (
  credentials: fetchDataFromAadharPhotosType
) => {
  return axiosInstance.post("/", credentials);
};
