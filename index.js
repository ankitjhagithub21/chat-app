const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('join', (username) => {
    socket.username = username;
    io.emit('userJoined', `${username} has joined the chat`);
  });

  socket.on('message', (message) => {
    io.emit('message', `${socket.username}: ${message}`);
  });

  socket.on('disconnect', () => {
    io.emit('userLeft', `${socket.username} has left the chat`);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
