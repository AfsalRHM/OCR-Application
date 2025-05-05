import * as yup from "yup";

export const SaveRecordValidation = yup.object().shape({
  recordName: yup
    .string()
    .required("Record name is required")
    .min(3, "Record name must be at least 3 characters")
    .max(50, "Record name cannot exceed 50 characters"),

  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .max(15, "Password cannot exceed 15 characters"),
});
