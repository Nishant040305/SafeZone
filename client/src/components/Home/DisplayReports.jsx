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
            // Images related to floods
            "https://images.unsplash.com/photo-1617494532490-297fc0eb515e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1547683905-f686c993aae5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          ],
        },
        {
          category: "Fire",
          title: "Warehouse Fire",
          description: "Massive fire in Mumbai suburb area.",
          latitude: "19.0760",
          longitude: "72.8777",
          media: [
            "https://media.istockphoto.com/id/172322795/photo/windblown-house-fire.jpg?s=612x612&w=0&k=20&c=nd776xndDhwgxgkgR8YaUaBQbRXrjVWSLKmKhobX2c8=",
            "https://media.istockphoto.com/id/182148949/photo/warehouse-fire.jpg?s=2048x2048&w=is&k=20&c=MlC_JxG8gPjBHRJohrzL4R0bySVDIt3aaR9TzIUPcAg=",
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
