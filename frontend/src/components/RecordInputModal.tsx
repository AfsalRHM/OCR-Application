import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { SaveRecordModalProps } from "../interfaces/SaveRecordModal";
import { SaveRecordValidation } from "../validations/SaveRecordValidation";
import { showErrorToast } from "../utils/iziToastUtils";

export default function RecordInputModal({
  isOpen,
  onClose,
  onSave,
  type,
}: SaveRecordModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ recordName: string; password: string }>();

  const onSubmit = async (data: { recordName: string; password: string }) => {
    try {
      await SaveRecordValidation.validate(data);

      const response: boolean = await onSave(data);
      if (response) {
        reset();
        onClose();
      }
    } catch (error: any) {
      if (error.name === "ValidationError") {
        showErrorToast(error.message);
      } else {
        showErrorToast(error.message);
        console.log(error);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold underline">
            {type == "save" ? "Save Aadhaar Record" : "Fetch Aadhaar Record"}
          </h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500 hover:cursor-pointer" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Record Name
            </label>
            <input
              {...register("recordName", {
                required: "Record name is required",
              })}
              className="mt-1 w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter a name for this record"
            />
            {errors.recordName && (
              <p className="text-sm text-red-500 mt-1">
                {errors.recordName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              className="mt-1 w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter a password"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 hover:cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white hover:cursor-pointer"
            >
              {type == "save" ? "Save" : "Find"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
