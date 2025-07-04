import { Upload } from "lucide-react";

interface ImageUploadProps {
  label: string;
  image: File | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
}

export default function ImageUpload({
  label,
  image,
  onChange,
  onRemove,
}: ImageUploadProps) {
  const convertToUrl = (image: File) => {
    return URL.createObjectURL(image);
  };

  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center relative">
      <h5>{label}</h5>
      {image ? (
        <div className="relative">
          <img
            src={convertToUrl(image)}
            alt={label}
            className="max-h-48 mx-auto object-contain"
          />
          <button
            className="absolute top-2 right-2 bg-red-500 w-6 text-white rounded-full p-1 text-xs z-10 hover:cursor-pointer"
            onClick={onRemove}
            type="button"
          >
            X
          </button>
        </div>
      ) : (
        <>
          <div className="py-8">
            <Upload className="mx-auto text-gray-400 mb-2" size={36} />
            <p className="text-sm text-gray-500">
              Click to upload or drag and drop
            </p>
          </div>
          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
            onChange={onChange}
          />
        </>
      )}
    </div>
  );
}
