import { useState } from "react";
import { Upload, FileText } from "lucide-react";
import ImageUpload from "../components/ImageUpload";
import Button from "../components/Button";

export default function MainPage() {
  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [backImage, setBackImage] = useState<string | null>(null);

  const handleFrontImageChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      setFrontImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleBackImageChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      setBackImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-blue-600 text-white p-4 flex justify-center">
        <h1 className="text-2xl font-bold underline">Aadhar Card OCR Extractor</h1>
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
                image={frontImage}
                onChange={handleFrontImageChange}
                onRemove={() => setFrontImage(null)}
              />
              <ImageUpload
                label="Back Side of Aadhar Card"
                image={backImage}
                onChange={handleBackImageChange}
                onRemove={() => setBackImage(null)}
              />

              <Button>Extract Aadhar Information</Button>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-6">
          <div className="bg-white rounded-lg shadow-md p-6 h-full">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <FileText className="mr-2" size={20} />
              Extracted Aadhar Information
            </h2>

            <div className="space-y-4">
              {[
                "Name",
                "Aadhar Number",
                "Date of Birth",
                "Gender",
                "Address",
                "Pincode",
              ].map((label) => (
                <div key={label} className="border-b border-gray-200 pb-3">
                  <h3 className="text-sm font-medium text-gray-500">{label}</h3>
                  <p className="text-gray-900">--</p>
                </div>
              ))}
            </div>

            <div className="mt-6 md:flex justify-end space-x-3">
              <Button variant="success">Save Data</Button>
              <Button>Retrieve Data</Button>
              <Button variant="secondary">Clear Data</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
