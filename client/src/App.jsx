import { useEffect, useState } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import url from "./url.json";
import LoginMain from "./container/LoginMain";
import { verifyUser } from "./Store/userSlice";
import ReportForm from "./components/Report/ReportForm";
import LandingPage from "./components/LandingPage/LandingPage";
import DisplayReports from "./components/Home/DisplayReports";
import Profile from "./components/Profile/Profile";
import EditProfile from "./components/Profile/EditProfile";

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
        element={isAuthenticated ? <Homepage /> : <LandingPage />}
      />

      {/* Login Page - only if not logged in */}
      <Route
        path={url.Login}
        element={
          isAuthenticated ? <Navigate to={url.LandingPage} /> : <LoginMain />
        }
      />
      <Route path={url.Logout} element={<Logout />} />

      {/* Protected Routes */}
      <Route
        element={
          isAuthenticated ? <Outlet /> : <Navigate to={url.LandingPage} />
        }
      >
        <Route path={url.createReport} element={<ReportForm />} />
        <Route path={url.profile} element={<Profile user={user} />} />
        <Route path={url.editProfile} element={<EditProfile user={user} />} />
      </Route>

      {/* Fallback */}
      <Route
        path="*"
        element={isAuthenticated ? <DisplayReports /> : <LandingPage />}
      />
    </Routes>
  );
};

export default App;
