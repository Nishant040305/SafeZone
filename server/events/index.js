//Handlers for socket.io
module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('connect', () => {
      console.log('A user connected:', socket.id);
    });
    socket.on('disconnect', () => {
      console.log('A user disconnected:', socket.id);
    });
  });
  io.engine.on('connection_error', (err) => {
    console.log(err.req); // the request object
    console.log(err.code); // the error code, for example 1
    console.log(err.message); // the error message, for example "Session ID unknown"
    console.log(err.context); // some additional error context
  });
};
