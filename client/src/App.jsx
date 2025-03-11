import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import url from "./url.json";
import LoginMain from "./container/LoginMain";
import { verifyUser } from "./Store/userSlice";
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
        element={isAuthenticated ? <div>Landing Page</div> : <LoginMain />}
      />
      {/* Login Page */}
      <Route path={url.Login} element={<LoginMain />} />
    </Routes>
  );
};

export default App;
