export const FileUploadField = ({ onChange }) => {
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    onChange(files);
  };

  return (
    <div className="mb-4">
      <label className="block font-semibold mb-1">
        Upload Media (Images & Videos)
      </label>
      <input
        type="file"
        multiple
        accept="image/*,video/*"
        onChange={handleFileChange}
        className="w-full p-2 border rounded-lg"
      />
    </div>
  );
};
