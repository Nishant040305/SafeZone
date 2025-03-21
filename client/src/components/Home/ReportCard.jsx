import React, { useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { updateVotes } from "../../scripts/reportService";

const ReportCard = ({ report }) => {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user.userInfo._id);
  const {
    category,
    title,
    description,
    location,
    media,
    upvotes,
    downvotes,
    upvotedBy,
    downvotedBy,
    status,
  } = report;
  const { latitude, longitude } = location;

  const isVideo = (url) => /\.(mp4|webm|ogg)$/i.test(url);
  const isImage = (url) => !isVideo(url);

  const handleVote = async (type) => {
    const id = report._id;
    const updatedReport = await updateVotes(id, type);
    // setReport(updatedReport);
  };

  const images = media.filter(isImage);
  const videos = media.filter(isVideo);
  const sortedMedia = [...images, ...videos];
  const userUpvoted = upvotedBy.includes(userId);
  const userDownvoted = downvotedBy.includes(userId);

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    verified: "bg-blue-100 text-blue-800",
    resolved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };

  return (
    <div className="bg-white rounded-2xl shadow-md max-w-md w-full mx-auto border border-gray-200">
      {/* Header */}
      <div
        className="flex items-center justify-between p-4 border-b cursor-pointer"
        onClick={() => navigate(`/report/${report._id}`)}
      >
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-sm text-gray-500">{category}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">
            📍 {latitude.toFixed(2)}, {longitude.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Swiper Media Carousel */}
      {sortedMedia.length > 0 && (
        <Swiper
          spaceBetween={10}
          pagination={{ clickable: true }}
          modules={[Pagination]}
          className="w-full h-64"
        >
          {sortedMedia.map((url, idx) => (
            <SwiperSlide key={idx}>
              <div className="w-full h-64 bg-black">
                {isVideo(url) ? (
                  <video
                    controls
                    className="w-full h-full object-cover rounded-t-xl"
                  >
                    <source src={url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    src={url}
                    alt={`media-${idx}`}
                    className="w-full h-full object-cover rounded-t-xl"
                  />
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* Description & Reactions */}
      <div className="p-4">
        <p className="text-sm text-gray-700 mb-2">{description}</p>

        <div className="flex gap-4 mt-2">
          <button
            onClick={() => handleVote("upvote")}
            className={`flex items-center gap-1 ${
              userUpvoted ? "text-green-600 font-bold" : "text-gray-600"
            }`}
          >
            <ThumbsUp size={18} /> {upvotes}
          </button>
          <button
            onClick={() => handleVote("downvote")}
            className={`flex items-center gap-1 ${
              userDownvoted ? "text-red-600 font-bold" : "text-gray-600"
            }`}
          >
            <ThumbsDown size={18} /> {downvotes}
          </button>
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              statusColors[status] || "bg-gray-100 text-gray-800"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
