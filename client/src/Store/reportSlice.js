// src/store/reportSlice.js
import { createSlice } from "@reduxjs/toolkit";

// Load initial state from sessionStorage if available
const loadStateFromSession = () => {
  const savedState = sessionStorage.getItem("reportState");
  return savedState
    ? JSON.parse(savedState)
    : {
        reports: [],
        page: 1,
        hasMore: true,
      };
};

const initialState = loadStateFromSession();

const reportSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    setReports: (state, action) => {
      state.reports = [...state.reports, ...action.payload.reports];
      state.page = state.page + 1;
      state.hasMore = action.payload.hasMore;
      // Save to sessionStorage
      sessionStorage.setItem("reportState", JSON.stringify(state));
    },
    resetReports: (state) => {
      state.reports = [];
      state.page = 1;
      state.hasMore = true;
      sessionStorage.setItem("reportState", JSON.stringify(state));
    },
  },
});

export const { setReports, resetReports } = reportSlice.actions;
export default reportSlice.reducer;
