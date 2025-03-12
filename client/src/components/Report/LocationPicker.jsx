import { useState } from "react";
export const LocationPicker = ({ onSelect }) => {
  const [location, setLocation] = useState({ lat: "", lng: "" });

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setLocation({ lat, lng });
        onSelect(lat, lng);
      });
    }
  };

  return (
    <div className="mb-4">
      <label className="block font-semibold mb-1">Location</label>
      <button
        type="button"
        onClick={getLocation}
        className="bg-gray-500 text-white px-4 py-2 rounded-lg"
      >
        Use Current Location
      </button>
      {location.lat && (
        <p className="mt-2">
          Lat: {location.lat}, Lng: {location.lng}
        </p>
      )}
    </div>
  );
};
