// src/components/DisplayReports.jsx
import React, { useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setReports } from "../../Store/reportSlice"; // Adjust path
import ReportCard from "./ReportCard";

const DisplayReports = () => {
  const dispatch = useDispatch();
  const { reports, page, hasMore } = useSelector((state) => state.reports); // Access Redux state
  const loader = useRef(null);

  const fetchReports = useCallback(async () => {
    if (!hasMore) return;

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_REACT_APP_BACKWEB
        }/api/report/getReports?page=${page}&limit=20`
      );
      const data = await response.json();
      if (response.ok) {
        dispatch(setReports({ reports: data.reports, hasMore: data.hasMore }));
      } else {
        console.error("Error fetching reports:", data.message);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  }, [dispatch, page, hasMore]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchReports();
        }
      },
      { threshold: 1.0 }
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => observer.disconnect();
  }, [fetchReports]);

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 md:px-8">
      <h1 className="text-2xl font-bold mb-6">📢 Recent Reports</h1>
      <div className="flex flex-col gap-6">
        {reports.map((report, index) => (
          <ReportCard key={index} report={report} />
        ))}
      </div>
      {hasMore && (
        <div ref={loader} className="text-center py-4">
          Loading more reports...
        </div>
      )}
    </div>
  );
};

export default DisplayReports;
