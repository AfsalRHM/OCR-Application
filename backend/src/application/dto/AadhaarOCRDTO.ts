export interface AadhaarUploadFields {
  adhaarFront?: Express.Multer.File[];
  adhaarBack?: Express.Multer.File[];
}

export interface AadhaarOCRRequestDTO {
  frontImageBuffer: Buffer;
  backImageBuffer: Buffer;
}

export interface AadhaarOCRResponseDTO {
  name: string;
  dob: string;
  gender: string;
  aadhaarNumber: string;
  address: string;
  pincode: string;
}
