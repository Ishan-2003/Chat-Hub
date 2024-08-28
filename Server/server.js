const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
const path = require('path');
app.use(cors());

var __dirname = path.resolve()
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (username, roomID) => {
    socket.join(roomID);
    socket.to(roomID).emit("notification", {
      user: username,
      room: roomID,
    });
    // console.log(`User joined room: ${r}`);
  });
  socket.on("readytoLeave", (username, roomID) => {
    socket.to(roomID).emit("notify", {
      user: username,
      room: roomID,
    });
    socket.disconnect();

  });

  socket.on("send_message", (data) => {
    console.log("data recieved on server", data);
    socket.to(data.roomID).emit("receive_message", data);
  })
  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });


});
app.use(express.static(path.join(__dirname, '/client/dist')))
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname,'client','dist','index.html'))
})

server.listen(3001, () => {
  console.log("SERVER RUNNING")
})