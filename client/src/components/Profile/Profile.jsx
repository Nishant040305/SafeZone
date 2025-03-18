import { Phone } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import MyReports from "./MyReports";

const Profile = ({ user }) => {
  console.log(user);

  return (
    <div>
      <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md mt-10">
        <div className="flex flex-col items-center">
          <img
            src={user.avatar}
            alt="avatar"
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
          />
          <h2 className="mt-4 text-xl font-semibold">{user.name}</h2>
          <div className="text-gray-600">@{user.displayname}</div>
          <div className="text-sm text-gray-500">{user.email}</div>
          <div className="text-sm text-gray-500">
            <p className="flex">
              <Phone /> {user.phone || "+ Add Phone Number"}
            </p>
          </div>

          <Link
            to="/edit-profile"
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Edit Profile
          </Link>
        </div>
      </div>
      <div>
        <MyReports />
      </div>
    </div>
  );
};

export default Profile;
