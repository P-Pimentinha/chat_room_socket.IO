const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const helmet = require('helmet');
const compression = require ('compression');

const PORT = process.env.PORT || 9090;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});


io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chat message', (msg) => {
    socket.broadcast.emit('chat message', msg);
  });
  


  socket.on('disconnect', () => console.log('Client disconnected'));
});





app.use(helmet());
app.use(compression());


server.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});





////////////////////////////////////

