import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const SingleReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // setLoading(false);
  /*   useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await axios.get(`/api/reports/${id}`);
        setReport(res.data);

        // Optional: fetch comments if stored separately
        // const commentRes = await axios.get(`/api/reports/${id}/comments`);
        // setComments(commentRes.data);
      } catch (error) {
        console.error("Error fetching report:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [id]);
 */
  const username = "John Doe";
  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const commentObj = {
      id: Date.now(),
      user: username,
      text: newComment,
      createdAt: new Date().toLocaleString(),
    };

    setComments((prev) => [commentObj, ...prev]);
    setNewComment("");
  };

  const isVideo = (url) => /\.(mp4|webm|ogg)$/i.test(url);
  const isImage = (url) => !isVideo(url);

  // if (loading) return <div className="p-6 text-center">Loading...</div>;
  // if (!report) return <div className="p-6 text-center">Report not found.</div>;

  const report = {
    _id: "dummy123",
    title: "Flood in Residential Area",
    category: "Natural Disaster",
    description:
      "Heavy rainfall has caused severe flooding in the residential neighborhood. Roads are submerged, and houses are affected. Immediate action is required.",
    latitude: "28.6139",
    longitude: "77.2090",
    media: [
      "https://images.unsplash.com/photo-1600077103887-0e17100c7e1a", // image
      "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4", // video
      "https://images.unsplash.com/photo-1581090700227-1e8e094ef7b4", // image
      "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_10mb.mp4", // video
    ],
  };

  const { title, category, description, latitude, longitude, media } = report;

  const images = media.filter(isImage);
  const videos = media.filter(isVideo);
  const sortedMedia = [...images, ...videos];

  return (
    <div className="max-w-3xl mx-auto p-4">
      <button
        className="flex items-center gap-2 mb-4 text-blue-600 hover:underline"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={20} /> Back
      </button>

      <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-200">
        {/* Media */}
        {sortedMedia.length > 0 && (
          <Swiper
            spaceBetween={10}
            pagination={{ clickable: true }}
            modules={[Pagination]}
            className="w-full h-80"
          >
            {sortedMedia.map((url, idx) => (
              <SwiperSlide key={idx}>
                <div className="w-full h-80 bg-black">
                  {isVideo(url) ? (
                    <video controls className="w-full h-full object-cover">
                      <source src={url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img
                      src={url}
                      alt={`media-${idx}`}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* Details */}
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-1">{title}</h2>
          <p className="text-sm text-gray-500 mb-2">{category}</p>
          <p className="text-gray-700 mb-4">{description}</p>
          <p className="text-sm text-gray-400 mb-2">
            📍 {latitude}, {longitude}
          </p>
        </div>
      </div>

      {/* Comments Section */}
      {/* <div className="mt-8 bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Comments</h3>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-4">
          <textarea
            className="w-full border border-gray-300 rounded-lg p-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={2}
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            onClick={handleAddComment}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Post
          </button>
        </div>

        {comments.length === 0 ? (
          <p className="text-gray-500 text-sm">No comments yet.</p>
        ) : (
          <ul className="space-y-4">
            {comments.map((comment) => (
              <li
                key={comment.id}
                className="border-t pt-2 text-sm text-gray-800"
              >
                <p>{comment.text}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {comment.createdAt}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div> */}
      {/* Comments Section */}
      <div className="mt-8 bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <h3 className="text-lg font-semibold mb-4">Comments</h3>

        <div className="flex flex-col sm:flex-row gap-2 mb-4">
          <textarea
            className="w-full border border-gray-300 rounded-lg p-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={2}
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            onClick={handleAddComment}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition h-fit"
          >
            Post
          </button>
        </div>

        {comments.length === 0 ? (
          <p className="text-gray-500 text-sm">No comments yet.</p>
        ) : (
          <ul className="space-y-4">
            {comments.map((comment) => (
              <li
                key={comment.id}
                className="border-t pt-3 text-sm text-gray-800"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{comment.user}</span>
                  <span className="text-xs text-gray-400">
                    {comment.createdAt}
                  </span>
                </div>
                <p className="mt-1">{comment.text}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SingleReport;
