import { useState } from "react";
import CategoryDropdown from "./CategoryDropdown";
import LocationPicker from "./LocationPicker";
import FileUploadField from "./FileUploadField";
import InputField from "./InputField";
import TextAreaField from "./TextAreaField";

const ReportForm = () => {
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    latitude: "",
    longitude: "",
    media: [],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLocationSelect = (lat, lng) => {
    setFormData({ ...formData, latitude: lat, longitude: lng });
  };

  const handleFileChange = (files) => {
    setFormData({ ...formData, media: files });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Report a Disaster</h2>
      <form onSubmit={handleSubmit}>
        <CategoryDropdown value={formData.category} onChange={handleChange} />
        <InputField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <TextAreaField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        <LocationPicker onSelect={handleLocationSelect} />
        <FileUploadField onChange={handleFileChange} />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReportForm;
