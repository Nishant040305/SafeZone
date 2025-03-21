import axios from "axios";
import { useEffect } from "react";
import server from "../server.json";
const getSingleReport = (id, setReport, setLoading) => {
  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BACKWEB}${
            server.Report.getSingleReport
          }/${id}`
        );
        setReport(res.data);
      } catch (error) {
        console.error("Error fetching report:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [id]);
};

export default getSingleReport;
