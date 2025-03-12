const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const http = require('http');
const { Server } = require('socket.io');
const socketHandlers = require('./events');

// Load environment variables
require('dotenv').config();

// Connect to database
const db = require('./db/mongoose');

// Create express app and add middlewares
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
    transports: ['websocket', 'polling'],
  },
});
socketHandlers(io);

app.use(
  cors({
    origin: process.env.CLIENT || 'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'none',
    },
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URL }),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(cookieParser());

// New Screenshot Endpoint with Beautiful and Informative Disaster Hub HTML
app.get('/', async (req, res) => {
  const Screenshot = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>SafeZone: Disaster Information Hub</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: 'Poppins', sans-serif;
          background: linear-gradient(120deg, #0f2027, #203a43, #2c5364);
          color: #ffffff;
          line-height: 1.6;
          min-height: 100vh;
          overflow-x: hidden;
          position: relative;
        }
        .container {
          padding: 60px 20px;
          text-align: center;
          max-width: 1200px;
          margin: 0 auto;
        }
        h1 {
          font-size: 72px;
          font-weight: 700;
          background: linear-gradient(to right, #ff6b6b, #ffe066);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          margin-bottom: 15px;
          animation: fadeInDown 1.5s ease-out;
        }
        .tagline {
          font-size: 32px;
          font-weight: 300;
          color: #d5dee2;
          margin-bottom: 40px;
          animation: fadeIn 2s ease-out;
        }
        .intro {
          font-size: 20px;
          max-width: 900px;
          margin: 0 auto 60px;
          color: #ecf0f1;
          animation: slideInUp 2s ease-out;
        }
        .highlight {
          color: #ff6b6b;
          font-weight: 600;
          animation: glow 2s ease-in-out infinite;
        }
        .features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
          margin-bottom: 70px;
        }
        .feature-card {
          background: rgba(255, 255, 255, 0.05);
          padding: 25px;
          border-radius: 15px;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          animation: zoomIn 1.8s ease-out;
          transition: transform 0.4s, box-shadow 0.4s;
        }
        .feature-card:hover {
          transform: translateY(-15px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
        }
        .feature-card h3 {
          font-size: 26px;
          color: #ffe066;
          margin-bottom: 15px;
          font-weight: 600;
        }
        .feature-card p {
          font-size: 16px;
          color: #d5dee2;
        }
        .cta-button {
          background: linear-gradient(45deg, #ff6b6b, #ff8e53);
          color: #ffffff;
          border: none;
          padding: 15px 40px;
          font-size: 22px;
          font-weight: 500;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.4s ease;
          animation: bounceIn 2s ease-out;
        }
        .cta-button:hover {
          transform: scale(1.1) rotate(2deg);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
          background: linear-gradient(45deg, #ff8e53, #ff6b6b);
        }
        .info-section {
          background: rgba(255, 255, 255, 0.08);
          padding: 40px;
          border-radius: 15px;
          margin: 0 auto 50px;
          max-width: 900px;
          animation: fadeInUp 2.2s ease-out;
        }
        .info-section h2 {
          font-size: 34px;
          color: #ffe066;
          margin-bottom: 20px;
        }
        .info-section p {
          font-size: 18px;
          color: #ecf0f1;
        }
        .footer {
          font-size: 16px;
          color: #bdc3c7;
          margin-top: 50px;
          animation: fadeIn 3s ease-out;
        }
        /* Animations */
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
      </style>
    </head>
    <body>
      <div class="container">
        <h1>SafeZone</h1>
        <div class="tagline">Your Trusted Disaster Information Hub</div>
        <p class="intro">
          Empowering you with <span class="highlight">real-time disaster alerts</span>, 
          <span class="highlight">expert safety resources</span>, and 
          <span class="highlight">community-powered insights</span> 
          to stay ahead of emergencies and protect what matters most.
        </p>

        <div class="info-section">
          <h2>Why SafeZone?</h2>
          <p>
            Disasters strike without warning, but preparation saves lives. SafeZone delivers critical updates 
            from trusted sources, personalized safety plans, and a platform for communities to collaborate 
            during crises. Whether it's earthquakes, floods, or wildfires, we've got you covered.
          </p>
        </div>

        <div class="features">
          <div class="feature-card">
            <h3>Instant Alerts</h3>
            <p>
              Receive live notifications tailored to your location—earthquake warnings, flood alerts, 
              and more—delivered in seconds via our advanced monitoring system.
            </p>
          </div>
          <div class="feature-card">
            <h3>Safety Resources</h3>
            <p>
              Access detailed guides, evacuation routes, and survival tips curated by disaster experts 
              to keep you and your family safe before, during, and after a crisis.
            </p>
          </div>
          <div class="feature-card">
            <h3>Community Network</h3>
            <p>
              Share real-time updates, request help, or offer support through our secure, user-driven 
              platform—because together, we're stronger in any disaster.
            </p>
          </div>
        </div>

        <button class="cta-button" onclick="window.location='${process.env.CLIENT}'">
          Join SafeZone Today
        </button>

        <div class="footer">
          Powered by Ctrl+Alt+Elite • Designed for Resilience • Last Updated: March 11, 2025
        </div>
      </div>
    </body>
    </html>
  `;
  res.send(Screenshot);
});

// Middleware for error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server error');
});

const routes = require('./routes');
app.use('/api', routes);

// Start server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server and Socket.io are running on port ${PORT}`);
});
