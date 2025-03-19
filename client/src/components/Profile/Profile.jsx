import { Phone, Pencil } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Profile = ({ user }) => {
  console.log(user);

  return (
    <div className="max-w-md mx-auto p-6 w-[90vw] mt-6">
      <div className="flex flex-wrap sm:flex-nowrap items-center gap-6 md:gap-12">
        {/* Avatar Section */}
        <div className="flex-shrink-0">
          <img
            src={user.avatar}
            alt="avatar"
            className="w-24 h-24 sm:w-30 sm:h-30 rounded-full object-cover border-2 border-gray-300"
          />
        </div>

        {/* User Info Section */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold truncate">{user.name}</h2>
            {/* Edit Profile Button */}
            <Link
              to="/edit-profile"
              className="inline-block px-1 py-1 text-blue-600"
            >
              <Pencil size={15} className="cursor-pointer" />
            </Link>
          </div>
          <div className="text-gray-600 truncate">@{user.displayname}</div>
          <div className="text-sm text-gray-500 truncate">{user.email}</div>

          {/* Phone Info */}
          <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
            <Phone size={16} />
            {user.phone || "+ Add Phone Number"}
          </div>


        </div>
      </div>
    </div>
  );
};

export default Profile;
