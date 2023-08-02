// server.js
var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io")(server);

//keep track of how times clients have clicked the button
var clickCount = 0;

io.on("connection", function (client) {
  //when the server receives clicked message, do this
  client.on("status", function (data) {
    for (i = 0; i < 10; i++) {
      clickCount++;
      io.emit(data.fileId, clickCount);
    }
  });
  console.log("End of connection");
});

io.on("disconnect", (client) => {
  console.log(client.id); // undefined
  console.log("End of disconnect");
});
//start our web server and socket.io server listening
server.listen(3000, function () {
  console.log("listening on *:3000");
});
