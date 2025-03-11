import React from "react";
import LoginBlock from "../components/Login/LoginBlock";
import "../assets/sideimage.svg";

const Information = () => {
  return (
    <div className="flex flex-col justify-start items-center h-screen p-8">
      <div className="text-white text-center p-6 w-full max-w-xl mx-auto">
        <h1
          className="font-extrabold tracking-wide mb-6"
          style={{ fontSize: "clamp(1rem, 4vw, 1.25rem)" }}
        >
          SafeZone
        </h1>
        <p
          className="mb-8 px-4"
          style={{ fontSize: "clamp(0.4rem, 2vw, 1rem)" }}
        >
          SafeZone is a comprehensive disaster information application designed
          to keep users informed and prepared during emergencies. It provides
          real-time alerts, safety tips, and community-driven updates to ensure
          swift and effective disaster response.
        </p>
        <p>
          <a
            href="/"
            className="font-semibold text-indigo-200 hover:text-white hover:underline transition duration-300 ease-in-out"
            style={{ fontSize: "clamp(0.35rem, 2vw, 1rem)" }}
          >
            Get Started →
          </a>
        </p>
      </div>
    </div>
  );
};

const LoginUser = () => {
  return (
    <div className="flex flex-row login-form">
      <LoginBlock />
      <div className="contain-img-redirect flex flex-col ">
        <Information />
        {/* Right panel, visible on medium and larger screens */}
        <div className="contain ">
          <div className="right-panel">{/* Right panel content */}</div>
        </div>
      </div>
    </div>
  );
};

export default LoginUser;
