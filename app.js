const express = require("express");
const socket = require("socket.io");

const app = express(); //server is initialized and ready
app.use(express.static("public"));

let port = process.env.PORT || 5000;
let server = app.listen(port, () => {
  console.log("Listening to port " + port);
});

let io = socket(server);

io.on("connection", (socket) => {
  console.log("made socket connection ");

  //received data
  socket.on("beginPath", (data) => {
    //data -> data from frontend
    //transfer data to all connected computers
    io.sockets.emit("beginPath", data);
  });

  socket.on("drawStroke", (data) => {
    io.sockets.emit("drawStroke", data);
  });

  socket.on("redoUndo", (data) => {
    io.sockets.emit("redoUndo", data);
  });

  socket.on("clearCanvas", (data) => {
    io.sockets.emit("clearCanvas", data);
  });
  console.log("conn");
});
