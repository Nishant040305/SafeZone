import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
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

const LocationPicker = ({ onSelect }) => {
  const [currentLocation, setCurrentLocation] = useState({
    lat: null,
    lng: null,
  });
  const [selectedLocation, setSelectedLocation] = useState({
    lat: null,
    lng: null,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setCurrentLocation({ lat, lng });
          setSelectedLocation({ lat, lng });
          onSelect(lat, lng);
        },
        (error) => {
          console.error("Error getting location:", error);
          setCurrentLocation({ lat: 28.7041, lng: 77.1025 });
          setSelectedLocation({ lat: 28.7041, lng: 77.1025 });
          onSelect(28.7041, 77.1025);
        }
      );
    } else {
      setCurrentLocation({ lat: 28.7041, lng: 77.1025 });
      setSelectedLocation({ lat: 28.7041, lng: 77.1025 });
      onSelect(28.7041, 77.1025);
    }
  }, []);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setCurrentLocation({ lat, lng });
        setSelectedLocation({ lat, lng });
        onSelect(lat, lng);
      });
    }
  };

  const MapInteraction = ({ setSelectedLocation, onSelect }) => {
    const map = useMap();

    useEffect(() => {
      const handleClick = (e) => {
        const { lat, lng } = e.latlng;
        setSelectedLocation({ lat, lng });
        onSelect(lat, lng);
        map.setView([lat, lng], map.getZoom());
      };

      map.on("click", handleClick);

      return () => {
        map.off("click", handleClick);
      };
    }, [map, setSelectedLocation, onSelect]);

    return null;
  };

  return (
    <div className="mb-4">
      <label className="block font-semibold mb-1">Location</label>

      <button
        type="button"
        onClick={getLocation}
        className="bg-gray-500 text-white px-4 py-2 rounded-lg mb-2"
      >
        Use Current Location
      </button>

      {/* Map display */}
      <div className="h-64 w-full">
        <MapContainer
          center={
            currentLocation.lat && currentLocation.lng
              ? [currentLocation.lat, currentLocation.lng]
              : [28.7041, 77.1025] // Fallback to Delhi
          }
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

          {currentLocation.lat && currentLocation.lng && (
            <Marker position={[currentLocation.lat, currentLocation.lng]} />
          )}

          {selectedLocation.lat && selectedLocation.lng && (
            <Marker
              position={[selectedLocation.lat, selectedLocation.lng]}
              icon={selectedIcon}
            />
          )}
        </MapContainer>
      </div>

      {selectedLocation.lat && selectedLocation.lng && (
        <p className="mt-2">
          Selected - Lat: {selectedLocation.lat.toFixed(6)}, Lng:{" "}
          {selectedLocation.lng.toFixed(6)}
        </p>
      )}
      {currentLocation.lat && currentLocation.lng && (
        <p className="mt-1">
          Current - Lat: {currentLocation.lat.toFixed(6)}, Lng:{" "}
          {currentLocation.lng.toFixed(6)}
        </p>
      )}
    </div>
  );
};

export default LocationPicker;
