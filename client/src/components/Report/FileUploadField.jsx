import { useState } from "react";

const FileUploadField = ({ onChange }) => {
  const [media, setMedia] = useState(Array(4).fill(null));

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const updatedMedia = [...media];
    updatedMedia[index] = file;
    setMedia(updatedMedia);
    onChange(updatedMedia.filter(Boolean));
  };

  const removeFile = (index) => {
    const updatedMedia = [...media];
    updatedMedia[index] = null;
    setMedia(updatedMedia);
    onChange(updatedMedia.filter(Boolean));
  };

  return (
    <div className="mb-4">
      <label className="block font-semibold mb-1">
        Upload Media (Images & Videos)
      </label>
      <div className="grid grid-cols-2 gap-2">
        {media.map((file, index) => (
          <div
            key={index}
            className="relative border rounded-lg w-32 h-32 flex items-center justify-center bg-gray-100"
          >
            {file ? (
              file.type.startsWith("image") ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <video controls className="w-full h-full object-cover">
                  <source src={URL.createObjectURL(file)} type={file.type} />
                </video>
              )
            ) : (
              <label className="cursor-pointer flex flex-col items-center justify-center w-full h-full">
                <span className="text-gray-500 text-sm">+</span>
                <input
                  type="file"
                  accept="image/*,video/*"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, index)}
                />
              </label>
            )}
            {file && (
              <button
                onClick={() => removeFile(index)}
                className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full"
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUploadField;
