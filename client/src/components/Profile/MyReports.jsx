import React, { useEffect, useState } from "react";
import axios from "axios";
import ReportCard from "../Home/ReportCard";

const MyReports = () => {
  const [myReports, setMyReports] = useState([]);
  const [loading, setLoading] = useState(true);

  // Replace with real user ID or token-based logic
  const userId = "user123"; // Dummy user ID for now

  /*   useEffect(() => {
    const fetchMyReports = async () => {
      try {
        const res = await axios.get(`/api/reports?user=${userId}`);
        setMyReports(res.data);
      } catch (error) {
        console.error("Failed to fetch user reports:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyReports();
  }, [userId]); */

  useEffect(() => {
    setMyReports([
      {
        _id: "r1",
        title: "Flooded Street in Sector 21",
        category: "Natural Disaster",
        description:
          "Water logging due to continuous rain. Roads are inaccessible.",
        location: {
          latitude: "28.7041",
          longitude: "77.1025",
        },
        media: ["https://images.unsplash.com/photo-1600077103887-0e17100c7e1a"],
        userId: "user123",
      },
      {
        _id: "r2",
        title: "Broken Streetlight near Park",
        category: "Infrastructure",
        description:
          "Streetlight not working for 3 days, causing darkness at night.",
        location: {
          latitude: "28.4595",
          longitude: "77.0266",
        },
        media: [],
        userId: "user123",
      },
      {
        _id: "r3",
        title: "Collapsed Tree Blocking Road",
        category: "Infrastructure",
        description:
          "A tree has fallen on the main road, blocking traffic completely.",
        location: {
          latitude: "19.0760",
          longitude: "72.8777",
        },
        media: ["https://images.unsplash.com/photo-1605174918525-dfc2d72c7c39"],
        userId: "user123",
      },
      {
        _id: "r4",
        title: "Power Outage in Sector 9",
        category: "Utilities",
        description: "No electricity in the area since last night.",
        location: {
          latitude: "23.2599",
          longitude: "77.4126",
        },
        media: [],
        userId: "user123",
      },
      {
        _id: "r5",
        title: "Overflowing Drain",
        category: "Sanitation",
        description: "Drainage system overflowing due to blockage.",
        location: {
          latitude: "12.9716",
          longitude: "77.5946",
        },
        media: ["https://images.unsplash.com/photo-1600096194318-76e6a98f8f8f"],
        userId: "user123",
      },
    ]);
    setLoading(false);
  }, []);

  return (
    <div className="max-w-6xl md:max-w-full mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">My Reports</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : myReports.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven’t submitted any reports yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myReports.map((report) => (
            <ReportCard key={report._id} report={report} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReports;
