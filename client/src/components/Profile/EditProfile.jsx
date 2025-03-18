import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ProfileUpdate } from "../../Store/userSlice";

const EditProfile = ({ user }) => {
  const [formData, setFormData] = useState({ ...user });
  const [preview, setPreview] = useState(user.avatar);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "avatar" && files[0]) {
      const file = files[0];
      setPreview(URL.createObjectURL(file));
      setFormData((prev) => ({ ...prev, avatar: file }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(ProfileUpdate(formData));
    navigate("/profile");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md mt-10"
    >
      <div className="flex flex-col items-center">
        <img
          src={preview}
          alt="avatar"
          className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 mb-4"
        />
        <input
          type="file"
          name="avatar"
          accept="image/*"
          onChange={handleChange}
          className="mb-4"
        />
      </div>

      <div className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="text"
          name="username"
          value={formData.displayname}
          onChange={handleChange}
          placeholder="Username"
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="phone"
          name="text"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone No."
          className="w-full px-4 py-2 border rounded-md"
        />
      </div>

      <button
        type="submit"
        className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
      >
        Save Changes
      </button>
    </form>
  );
};

export default EditProfile;
