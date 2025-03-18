import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white font-[Poppins] overflow-x-hidden">
      <div className="sm:w-3/4 container mx-auto px-5 py-16 text-center">
        <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-[#ff6b6b] to-[#ffe066] text-transparent bg-clip-text animate-fadeInDown mb-4">
          SafeZone
        </h1>
        <p className="text-2xl md:text-3xl font-light text-[#d5dee2] animate-fadeIn mb-10">
          Your Trusted Disaster Information Hub
        </p>
        <p className="text-lg max-w-4xl mx-auto text-[#ecf0f1] animate-slideInUp mb-14">
          Empowering you with{" "}
          <span className="text-[#ff6b6b] font-semibold animate-glow">
            real-time disaster alerts
          </span>
          ,{" "}
          <span className="text-[#ff6b6b] font-semibold animate-glow">
            expert safety resources
          </span>
          , and{" "}
          <span className="text-[#ff6b6b] font-semibold animate-glow">
            community-powered insights
          </span>{" "}
          to stay ahead of emergencies and protect what matters most.
        </p>

        <div className="bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] bg-opacity-10 backdrop-blur-md p-8 rounded-xl max-w-3xl mx-auto mb-12 animate-fadeInUp">
          <h2 className="text-3xl text-[#ffe066] mb-4">Why SafeZone?</h2>
          <p className="text-lg text-[#ecf0f1]">
            Disasters strike without warning, but preparation saves lives.
            SafeZone delivers critical updates from trusted sources,
            personalized safety plans, and a platform for communities to
            collaborate during crises. Whether it's earthquakes, floods, or
            wildfires, we've got you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14 animate-zoomIn">
          {[
            {
              title: "Instant Alerts",
              desc: "Receive live notifications tailored to your location—earthquake warnings, flood alerts, and more—delivered in seconds via our advanced monitoring system.",
            },
            {
              title: "Safety Resources",
              desc: "Access detailed guides, evacuation routes, and survival tips curated by disaster experts to keep you and your family safe before, during, and after a crisis.",
            },
            {
              title: "Community Network",
              desc: "Share real-time updates, request help, or offer support through our secure, user-driven platform—because together, we're stronger in any disaster.",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] bg-opacity-5 backdrop-blur-md p-6 rounded-xl border border-white border-opacity-10 shadow-xl hover:-translate-y-3 transition-all duration-300"
            >
              <h3 className="text-xl text-[#ffe066] font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-[#d5dee2] text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate("/login")}
          className="bg-gradient-to-r from-[#ff6b6b] to-[#ff8e53] text-white text-lg px-8 py-4 rounded-full font-medium transition-all duration-300 transform hover:scale-110 hover:rotate-1 shadow-lg animate-bounceIn cursor-pointer"
        >
          Join SafeZone Today
        </button>

        <div className="text-sm text-[#bdc3c7] mt-16 animate-fadeIn">
          Powered by Ctrl+Alt+Elite • Designed for Resilience • Last Updated:
          March 11, 2025
        </div>
      </div>

      {/* Custom animations via Tailwind plugin or custom classes */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes fadeInDown {
            from { opacity: 0; transform: translateY(-60px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideInUp {
            from { opacity: 0; transform: translateY(60px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes zoomIn {
            from { opacity: 0; transform: scale(0.85); }
            to { opacity: 1; transform: scale(1); }
          }
          @keyframes glow {
            0% { text-shadow: 0 0 5px #ff6b6b; }
            50% { text-shadow: 0 0 15px #ff6b6b, 0 0 25px #ff8e53; }
            100% { text-shadow: 0 0 5px #ff6b6b; }
          }
          @keyframes bounceIn {
            0% { opacity: 0; transform: scale(0.5); }
            60% { opacity: 1; transform: scale(1.1); }
            80% { transform: scale(0.95); }
            100% { transform: scale(1); }
          }

          .animate-fadeIn { animation: fadeIn 2s ease-out; }
          .animate-fadeInDown { animation: fadeInDown 1.5s ease-out; }
          .animate-slideInUp { animation: slideInUp 2s ease-out; }
          .animate-fadeInUp { animation: fadeInUp 2.2s ease-out; }
          .animate-zoomIn { animation: zoomIn 1.8s ease-out; }
          .animate-glow { animation: glow 2s ease-in-out infinite; }
          .animate-bounceIn { animation: bounceIn 2s ease-out; }
        `}
      </style>
    </div>
  );
};

export default LandingPage;
