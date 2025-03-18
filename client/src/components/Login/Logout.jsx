import { useDispatch } from "react-redux";
import { logout } from "../../Store/userSlice";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

function Logout() {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Logging out...");
    dispatch(logout());
  }, [dispatch]);
  return <Navigate to="/" />;
}

export default Logout;
