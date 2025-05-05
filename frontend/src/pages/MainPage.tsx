import { useState } from "react";
import { Upload } from "lucide-react";
import ImageUpload from "../components/ImageUpload";
import Button from "../components/Button";
import ViewData from "../components/ViewData";

import { fetchDataFromAadharPhotos } from "../apis/api";
import { showErrorToast } from "../utils/iziToastUtils";
import { ocrDataType } from "../interfaces/MainPage";

export default function MainPage() {
  const [frontImageFile, setFrontImageFile] = useState<File | null>(null);
  const [backImageFile, setBackImageFile] = useState<File | null>(null);

  const [ocrData, setOcrData] = useState<null | ocrDataType>(null);

  const handleFrontImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files, "this is the file");
    const file = e.target.files?.[0];
    console.log(file, "this is the file");
    if (file) {
      setFrontImageFile(file);
    }
  };

  const handleBackImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBackImageFile(file);
    }
  };

  const handleExtract = async () => {
    try {
      if (!frontImageFile && !backImageFile) {
        showErrorToast("Both images are required");
        return;
      } else if (!frontImageFile) {
        showErrorToast("Front image is required");
        return;
      } else if (!backImageFile) {
        showErrorToast("Back image is required");
        return;
      }

      const formData = new FormData();
      console.log(frontImageFile, backImageFile);
      formData.append("adhaarFront", frontImageFile);
      formData.append("adhaarBack", backImageFile);

      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      const response = await fetchDataFromAadharPhotos(formData);

      if (response.status == 200) {
        setOcrData(response.data);
      } else {
        throw new Error("Error on the Backend");
      }

      console.log(response);
    } catch (error) {
      console.log("Error occured while invoking the extract event");
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white p-4 flex justify-center">
        <h1 className="text-2xl font-bold underline">
          Aadhar Card OCR Extractor
        </h1>
      </header>

      <main className="flex flex-col md:flex-row flex-1">
        <div className="w-full md:w-1/2 p-6 border-r border-gray-200">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <Upload className="mr-2" size={20} />
              Upload Aadhar Card Images
            </h2>

            <div className="space-y-6">
              <ImageUpload
                label="Front Side of Aadhar Card"
                image={frontImageFile}
                onChange={handleFrontImageChange}
                onRemove={() => setFrontImageFile(null)}
              />
              <ImageUpload
                label="Back Side of Aadhar Card"
                image={backImageFile}
                onChange={handleBackImageChange}
                onRemove={() => setBackImageFile(null)}
              />

              <Button onClick={handleExtract}>
                Extract Aadhar Information
              </Button>
            </div>
          </div>
        </div>

        <ViewData ocrData={ocrData} />
      </main>
    </div>
  );
}
