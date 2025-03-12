import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Icons for current and selected locations
const selectedIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});
const currentIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});

const LocationPicker = ({ onSelect }) => {
  // Start with null to indicate that location is not yet fetched.
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Function to fetch current location
  const fetchCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          console.log("User's Current Location:", { lat, lng });
          setCurrentLocation({ lat, lng });
          setSelectedLocation({ lat, lng });
          onSelect(lat, lng);
        },
        (error) => {
          console.error("Error getting location:", error);
          // Fallback to default location (Delhi)
          const fallbackLat = 28.7041;
          const fallbackLng = 77.1025;
          setCurrentLocation({ lat: fallbackLat, lng: fallbackLng });
          setSelectedLocation({ lat: fallbackLat, lng: fallbackLng });
          onSelect(fallbackLat, fallbackLng);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  // Fetch location when the component mounts
  useEffect(() => {
    fetchCurrentLocation();
  }, []);

  // Handle map clicks to update the selected location
  const MapInteraction = ({ setSelectedLocation, onSelect }) => {
    const map = useMap();

    useEffect(() => {
      const handleClick = (e) => {
        const { lat, lng } = e.latlng;
        console.log("User Clicked on Map:", { lat, lng });
        setSelectedLocation({ lat, lng });
        onSelect(lat, lng);
        map.setView([lat, lng], map.getZoom());
      };

      map.on("click", handleClick);
      return () => map.off("click", handleClick);
    }, [map, setSelectedLocation, onSelect]);

    return null;
  };

  return (
    <div className="mb-4">
      <label className="block font-semibold mb-1">Location</label>
      <button
        type="button"
        onClick={fetchCurrentLocation}
        className="bg-gray-500 text-white px-4 py-2 rounded-lg mb-2"
      >
        Use Current Location
      </button>

      {/* Map Display */}
      <div className="h-64 w-full">
        {currentLocation ? (
          <MapContainer
            center={[currentLocation.lat, currentLocation.lng]}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <MapInteraction
              setSelectedLocation={setSelectedLocation}
              onSelect={onSelect}
            />

            {/* Current Location Marker */}
            <Marker
              position={[currentLocation.lat, currentLocation.lng]}
              icon={currentIcon}
            />

            {/* Selected Location Marker */}
            {selectedLocation && (
              <Marker
                position={[selectedLocation.lat, selectedLocation.lng]}
                icon={selectedIcon}
              />
            )}
          </MapContainer>
        ) : (
          <p>Loading map...</p>
        )}
      </div>

      {/* Display Selected and Current Locations */}
      {selectedLocation && (
        <p className="mt-2">
          <strong>Selected:</strong> Lat: {selectedLocation.lat.toFixed(6)},
          Lng: {selectedLocation.lng.toFixed(6)}
        </p>
      )}
      {currentLocation && (
        <p className="mt-1">
          <strong>Current:</strong> Lat: {currentLocation.lat.toFixed(6)}, Lng:{" "}
          {currentLocation.lng.toFixed(6)}
        </p>
      )}
    </div>
  );
};

export default LocationPicker;
