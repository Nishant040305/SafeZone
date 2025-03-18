import React, { useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";

const ReportCard = ({ report }) => {
  const navigate = useNavigate();
  const { category, title, description, latitude, longitude, media } = report;
  console.log(report);

  const [votes, setVotes] = useState({ up: 0, down: 0 });

  const handleUpvote = () => setVotes((prev) => ({ ...prev, up: prev.up + 1 }));
  const handleDownvote = () =>
    setVotes((prev) => ({ ...prev, down: prev.down + 1 }));

  const isVideo = (url) => /\.(mp4|webm|ogg)$/i.test(url);
  const isImage = (url) => !isVideo(url); // treat all non-video URLs as images

  // Sort media: images first, then videos
  const images = media.filter(isImage);
  const videos = media.filter(isVideo);
  const sortedMedia = [...images, ...videos];

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
        <span className="text-xs text-gray-400">
          📍 {latitude}, {longitude}
        </span>
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

        <div className="flex items-center gap-4 mt-4">
          <button
            onClick={handleUpvote}
            className="flex items-center gap-1 text-green-600 hover:text-green-800"
          >
            <ThumbsUp size={18} /> {votes.up}
          </button>
          <button
            onClick={handleDownvote}
            className="flex items-center gap-1 text-red-600 hover:text-red-800"
          >
            <ThumbsDown size={18} /> {votes.down}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
