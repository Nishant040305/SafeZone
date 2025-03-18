import { useState } from "react";
import { Menu, X, Bell, LogOut, User } from "lucide-react"; // Importing the Lucide icons
import { useDispatch } from "react-redux";
import { logout } from "../../Store/userSlice";
import AuthService from "../../scripts/API.Login";
import { useNavigate } from "react-router-dom";
import url from "../../url.json";
const Sidebar = () => {
  const dispatch = useDispatch();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <div className={`fixed top-2 left-2 p-2 bg-white shadow-lg`}>
        <button onClick={toggleSidebar}>
          {/* Using the Menu icon from Lucide */}
          <Menu
            className={`w-6 h-6 transform transition-all duration-300 ${
              isCollapsed ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      </div>
      {!isCollapsed ? (
        <div
          className={`fixed top-0 left-0 h-full bg-white shadow-lg transition-all duration-300 ease-in-out ${
            isCollapsed ? "w-15" : "w-52"
          } overflow-y-auto`}
        >
          <div className="flex justify-between items-center p-4">
            <button onClick={toggleSidebar}>
              {/* Using the X icon from Lucide */}
              <X
                className={`w-6 h-6 transform transition-all duration-300 ${
                  isCollapsed ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
          </div>

          {/* Sidebar items */}
          <div
            className={`flex flex-col items-center mt-6 ${
              isCollapsed ? "hidden" : "block"
            }`}
          >
            <div
              className="w-full p-4 text-center text-gray-700 hover:bg-gray-200 cursor-pointer flex items-center justify-center space-x-2"
              onClick={() => navigate(url.createReport)}
            >
              <Bell className="text-gray-500" size={20} /> {/* Icon */}
              <span className="text-xl font-semibold text-blue-600">
                Report
              </span>{" "}
              {/* Styled text */}
            </div>
            <div className="w-full p-4 text-center text-gray-700 hover:bg-gray-200 cursor-pointer flex items-center justify-center space-x-2">
              <User className="text-gray-500" size={20} /> {/* Icon */}
              <span className="text-xl font-semibold text-blue-600">
                Profile
              </span>{" "}
              {/* Styled text */}
            </div>
          </div>
          <button
            className="bg-red-600 bottom-1 transform translate-x-[50%] fixed text-white p-2 rounded-lg border m-3 font-md flex items-center"
            onClick={() => {
              dispatch(logout());
              new AuthService().logout();
            }}
          >
            <LogOut className="w-5 h-5 mr-2" /> {/* Logout icon */}
            Logout
          </button>
        </div>
      ) : null}
    </>
  );
};

export default Sidebar;
