import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ThumbsUp, ThumbsDown } from "lucide-react";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import getSingleReport from "../../hooks/getSingleReport";
import { postComment, updateVotes } from "../../scripts/reportService";

const SingleReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const username = useSelector((state) => state.user.userInfo.displayName);
  const userId = useSelector((state) => state.user.userInfo._id);
  getSingleReport(id, setReport, setLoading);

  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    const commentObj = await postComment(id, username, newComment);
    setComments((prev) => [commentObj, ...prev]);
    setNewComment("");
  };
  const handleVote = async (type) => {
    const updatedReport = await updateVotes(id, type);
    setReport(updatedReport);
  };

  const isVideo = (url) => /\.(mp4|webm|ogg)$/i.test(url);
  const isImage = (url) => !isVideo(url);

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (!report) return <div className="p-6 text-center">Report not found.</div>;

  const {
    title,
    category,
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
  const userUpvoted = upvotedBy.includes(userId);
  const userDownvoted = downvotedBy.includes(userId);
  const sortedMedia = [...media.filter(isImage), ...media.filter(isVideo)];
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    verified: "bg-blue-100 text-blue-800",
    resolved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };
  return (
    <div className="max-w-3xl mx-auto p-4">
      <button
        className="flex items-center gap-2 mb-4 text-blue-600 hover:underline"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={20} /> Back
      </button>

      <div className="bg-white shadow-md rounded-xl overflow-hidden border border-gray-200">
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

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-1">{title}</h2>
          <p className="text-sm text-gray-500 mb-2">{category}</p>
          <p className="text-gray-700 mb-4">{description}</p>
          <p className="text-sm text-gray-400 mb-2">
            📍 {latitude.toFixed(2)}, {longitude.toFixed(2)}
          </p>
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
