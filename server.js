const express = require('express');
const http = require('https');
const fs = require('fs');
const { Server } = require('socket.io');
const app = express();

const options = {
  key: fs.readFileSync('./ssl/10.10.13.89-key.pem'),
  cert: fs.readFileSync('./ssl/10.10.13.89.pem')
};

const server = http.createServer(options, app);

const io = new Server(server);

app.use(express.static('public'));



io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);

  socket.on('offer', (data) => {
    socket.broadcast.emit('offer', data);
  });

  socket.on('answer', (data) => {
    socket.broadcast.emit('answer', data);
  });

  socket.on('candidate', (data) => {
    socket.broadcast.emit('candidate', data);
  });
});

server.listen(8443, () => {
    console.log('HTTPS server running on port 8443');
});
