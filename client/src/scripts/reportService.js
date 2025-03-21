import { socket } from "./socket";
import server from "../server.json";
import axios from "axios";
const postComment = async (reportId, username, text) => {
  try {
    const response = await axios.get(`/api/reports/${reportId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: username, text }),
    });
    const data = await response.json();
    socket.emit("newComment", data);
    return data;
  } catch (error) {
    console.error("Error posting comment:", error);
  }
};

const updateVotes = async (reportId, type) => {
  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_REACT_APP_BACKWEB}${
        server.Report.vote
      }/${reportId}`,
      {
        type,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating votes:", error);
  }
};

export { postComment, updateVotes };
