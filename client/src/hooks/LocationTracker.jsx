import { useEffect } from "react";

const LocationTracker = () => {
  useEffect(() => {
    let watchId;

    const updateLocationInBackground = async (position) => {
      try {
        const { latitude, longitude } = position.coords;

        await fetch(
          `${import.meta.env.VITE_REACT_APP_BACKWEB}/api/user/location`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ latitude, longitude }),
          }
        );

        console.log("Location updated successfully");
      } catch (error) {
        console.error("Error updating location:", error);
      }
    };

    // Start watching position with high accuracy
    if (navigator.geolocation) {
      const options = {
        enableHighAccuracy: true,
        maximumAge: 10000, // 10 seconds
        timeout: 5000, // 5 seconds
      };

      watchId = navigator.geolocation.watchPosition(
        updateLocationInBackground,
        (err) => console.error(err),
        options
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }

    // Clean up
    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  // This component doesn't render anything
  return <div></div>;
};

export default LocationTracker;
