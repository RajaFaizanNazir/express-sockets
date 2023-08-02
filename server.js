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
    let i = 0;
    let totalMessage = 50000;
    for (; i < totalMessage; i++) {
      clickCount++;
      io.emit(data.fileId, clickCount, (delivered, callback) => {
        if (delivered) {
          // no ack from the server, let's retry
          // emit(socket, event, arg);
          //   console.log("delivered", clickCount);
        } else {
          console.log("not delivered", clickCount);
          totalMessage = i;
        }
      });
    }
    console.log(i, " message delivered");
    console.log("End of status");
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
