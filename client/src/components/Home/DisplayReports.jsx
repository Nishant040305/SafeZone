import React, { useEffect, useState } from "react";
import ReportCard from "./ReportCard";

const DisplayReports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      const dummyData = [
        {
          category: "Flood",
          title: "Flood in Area 9",
          description: "Heavy rain causing major water logging.",
          latitude: "28.7041",
          longitude: "77.1025",
          media: [
            // Images
            "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
            "https://images.unsplash.com/photo-1619023666077-9c1deec19f0b",
            // Videos
            "https://www.w3schools.com/html/mov_bbb.mp4",
            "https://samplelib.com/lib/preview/mp4/sample-5s.mp4",
          ],
        },
        {
          category: "Fire",
          title: "Warehouse Fire",
          description: "Massive fire in Mumbai suburb area.",
          latitude: "19.0760",
          longitude: "72.8777",
          media: [
            "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
            "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
            "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
            "https://www.w3schools.com/html/mov_bbb.mp4",
            "https://www.w3schools.com/html/movie.mp4",
          ],
        },
      ];
      setReports(dummyData);
    };

    fetchReports();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 md:px-8">
      <h1 className="text-2xl font-bold mb-6">📢 Recent Reports</h1>
      <div className="flex flex-col gap-6">
        {reports.map((report, index) => (
          <ReportCard key={index} report={report} />
        ))}
      </div>
    </div>
  );
};

export default DisplayReports;
