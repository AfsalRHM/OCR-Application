import { useState } from "react";
import { Upload } from "lucide-react";
import ImageUpload from "../components/ImageUpload";
import Button from "../components/Button";
import ViewData from "../components/ViewData";

import {
  fetchDataFromAadharPhotos,
  getRecordData,
  saveRecordData,
} from "../apis/api";
import {
  showConfirmToast,
  showErrorToast,
  showSuccessToast,
} from "../utils/iziToastUtils";
import { ocrDataType, saveDataType } from "../interfaces/MainPage";
import RecordInputModal from "../components/RecordInputModal";

export default function MainPage() {
  const [frontImageFile, setFrontImageFile] = useState<File | null>(null);
  const [backImageFile, setBackImageFile] = useState<File | null>(null);

  const [isSaveModalOpen, setSaveModalOpen] = useState(false);
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);

  const [ocrData, setOcrData] = useState<null | ocrDataType>(null);

  const handleFrontImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
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
      formData.append("adhaarFront", frontImageFile);
      formData.append("adhaarBack", backImageFile);

      const response = await fetchDataFromAadharPhotos(formData);

      if (response.status == 200) {
        setOcrData(response.data.data);
      } else {
        throw new Error("Error on the Backend");
      }
    } catch (error: any) {
      console.log("Error occured while invoking the extract event");
      showErrorToast(error.message);
      console.log(error);
    }
  };

  const handleClearData = () => {
    showConfirmToast("are you sure to clear the data...?", () => {
      handleConfirm();
    });

    const handleConfirm = () => {
      setOcrData(null);
      setFrontImageFile(null);
      setBackImageFile(null);
    };
  };

  const handleSaveData = async (data: saveDataType) => {
    try {
      if (!ocrData) {
        showErrorToast("No Extracted data available...");
        return;
      }

      const response = await saveRecordData({
        recordName: data.recordName,
        recordPassword: data.password,
        recordData: ocrData!,
      });

      if (response.status == 200) {
        showSuccessToast("Record saved Successfully");
      } else {
        throw new Error("Error on the Backend");
      }
    } catch (error: any) {
      console.log("Error occured while Saving the Data");
      showErrorToast(error.message);
      console.log(error);
    }
  };

  const handleSearchData = async (data: saveDataType) => {
    try {
      const response = await getRecordData({
        enteredName: data.recordName,
        enteredPassword: data.password,
      });

      if (response.status == 200) {
        showSuccessToast("Record Fetched Successfully");
        setOcrData(response.data.content);
      } else {
        throw new Error("Error on the Backend");
      }
    } catch (error: any) {
      console.log("Error occured while Fetching the Data");
      showErrorToast(error.message);
      console.log(error);
    }
  };

  return (
    <>
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

          <ViewData
            ocrData={ocrData}
            handleClearData={handleClearData}
            handleModalOpen={() => setSaveModalOpen(true)}
            handleSearchModalOpen={() => setSearchModalOpen(true)}
          />
        </main>
      </div>

      <RecordInputModal
        isOpen={isSaveModalOpen}
        onClose={() => setSaveModalOpen(false)}
        onSave={handleSaveData}
        type="save"
      />

      <RecordInputModal
        isOpen={isSearchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSave={handleSearchData}
        type="search"
      />
    </>
  );
}
