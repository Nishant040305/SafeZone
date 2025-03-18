import axios from "axios";
import server from "../server.json";

class ReportService {
  constructor() {
    this.baseURL = import.meta.env.VITE_REACT_APP_BACKWEB;
    this.server = server;
    this.MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB size limit
    this.ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "video/mp4"];
  }

  /**
   * Validate media files before upload
   * @param {File[]} files - Array of media files
   * @returns {boolean} - True if all files are valid, false otherwise
   */
  validateMedia(files) {
    for (const file of files) {
      if (!this.ALLOWED_FILE_TYPES.includes(file.type)) {
        throw new Error(
          `Invalid file type: ${file.type}. Allowed: JPEG, PNG, MP4`
        );
      }
      if (file.size > this.MAX_FILE_SIZE) {
        throw new Error(`File size exceeds 10MB: ${file.name}`);
      }
    }
    return true;
  }

  /**
   * Upload a single media file
   * @param {File} file - Media file to be uploaded
   * @returns {Promise<string>} - URL of uploaded file
   */
  async uploadMedia(file) {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        `${this.baseURL}${this.server.Media.uploadMedia}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status !== 200) throw new Error("Failed to upload media");
      return response.data.url; // Return uploaded media URL
    } catch (error) {
      console.error("Error uploading media:", error);
      throw error;
    }
  }

  /**
   * Submit a new report with optional media files
   * @param {Object} reportData - Report details
   * @returns {Promise<Object>} - Response data
   */
  async postReport(reportData) {
    try {
      let mediaURLs = [];

      if (reportData.media && reportData.media.length > 0) {
        this.validateMedia(reportData.media); // Validate before uploading

        // Upload all media files and collect URLs
        const uploadPromises = reportData.media.map((file) =>
          this.uploadMedia(file)
        );
        mediaURLs = await Promise.all(uploadPromises);
      } else {
        aleart("Add some supporting images/videos");
        return;
      }
      // Send report data with uploaded media URLs
      const response = await axios.post(
        `${this.baseURL}${this.server.Report.postReport}`,
        {
          ...reportData,
          media: mediaURLs,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (response.status !== 201) throw new Error("Failed to submit report");
      alert("Report submitted successfully");
      return response.data;
    } catch (error) {
      console.error("Error submitting report:", error);
      throw error;
    }
  }
}

export default ReportService;
