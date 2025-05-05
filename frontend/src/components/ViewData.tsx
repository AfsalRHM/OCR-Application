import { ocrDataType } from "../interfaces/MainPage";
import { ViewDataType } from "../interfaces/ViewData";
import Button from "./Button";
import { FileText } from "lucide-react";

const fields: { label: string; key: keyof ocrDataType }[] = [
  { label: "Name", key: "name" },
  { label: "Aadhar Number", key: "aadhaarNumber" },
  { label: "Date of Birth", key: "dob" },
  { label: "Gender", key: "gender" },
  { label: "Address", key: "address" },
  { label: "Pincode", key: "pincode" },
];

const ViewData = (props: ViewDataType) => {
  return (
    <div className="w-full md:w-1/2 p-6">
      <div className="bg-white rounded-lg shadow-md p-6 h-full">
        <h2 className="text-xl font-semibold mb-6 flex items-center">
          <FileText className="mr-2" size={20} />
          Extracted Aadhar Information
        </h2>

        <div className="space-y-4">
          {fields.map(({ label, key }) => {
            const value = props.ocrData?.[key];
            const isError =
              typeof value === "string" && value.includes("Unable");

            return (
              <div key={label} className="border-b border-gray-200 pb-3">
                <h3 className="text-sm font-medium text-gray-500">{label}</h3>
                <p className={isError ? `text-red-600` : `text-gray-900`}>
                  {value ?? "--"}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-6 md:flex justify-end space-x-3">
          <Button variant="success" onClick={props.handleModalOpen} disabled={props.ocrData == null}>
            Save Data
          </Button>
          <Button onClick={props.handleSearchModalOpen}>Retrieve Data</Button>
          <Button variant="secondary" onClick={props.handleClearData}>
            Clear Data
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewData;
