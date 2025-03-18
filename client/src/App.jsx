import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import url from "./url.json";
import LoginMain from "./container/LoginMain";
import { verifyUser } from "./Store/userSlice";
import ReportForm from "./components/Report/ReportForm";
import LandingPage from "./components/LandingPage/LandingPage";
import DisplayReports from "./components/Home/DisplayReports";

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  const user = useSelector((state) => state.user.userInfo);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (!mounted) {
      dispatch(verifyUser());
      setMounted(true);
    } else {
      if (!isAuthenticated) dispatch(verifyUser());
    }
  }, [isAuthenticated, user, mounted]);
  return (
    <Routes>
      {/* Landing Page */}
      <Route
        path={url.LandingPage}
        element={isAuthenticated ? <DisplayReports /> : <LandingPage />}
      />
      {/* Login Page */}
      <Route path={url.Login} element={<LoginMain />} />

      {/* Report Form */}
      <Route
        path={url.createReport}
        element={isAuthenticated ? <ReportForm /> : <LandingPage />}
      />

      <Route path="*" element={<LandingPage />} />
    </Routes>
  );
};

export default App;
