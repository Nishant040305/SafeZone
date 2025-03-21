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

// Make io available to controllers
app.set('io', io);

app.use(
  cors({
    origin: process.env.CLIENT || 'http://localhost:5173',
    methods: 'GET,POST,PUT,DELETE,PATCH',
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
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Middleware for error
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send('Internal Server error');
});

const routes = require('./routes');
app.use('/api', routes);

// Start server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server and Socket.io are running on port ${PORT}`);
});
