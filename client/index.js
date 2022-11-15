const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const formatMessage = require("./utils/messages");
const {
  userJoin,
  userLeave,
  getCurrentUser,
  getRoomUsers,
} = require("./utils/users");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set static dir
app.use(express.static(path.join(__dirname, "public")));

// Set Timezone
process.env.TZ = "Asia/Jakarta";

const botName = "Mederator Bot";

// Run when client connects
io.on("connection", (socket) => {
  // Listen from joinRoom
  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    // Grouping a user to room by a specific room's name
    socket.join(room);

    // Welcome current user in the room
    socket.emit(
      "message",
      formatMessage(botName, `Welcome ${username} to the ${room} room!`)
    );

    // Broadcast when a user connects to a specific room's name
    socket.broadcast
      .to(room)
      .emit(
        "message",
        formatMessage(botName, `${username} has joined the chat!`)
      );

    // Send users and room info
    io.to(room).emit("roomUsers", {
      room,
      users: getRoomUsers(room),
    });
  });

  // Listen for chatMessage
  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit("message", formatMessage(user.username, msg));
  });

  // Run when client disconnects
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage(botName, `${user.username} has left the chat.`)
      );

      // Send users and room info
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
});

app.get("/", function(req,res){
    res.sendFile(__dirname+"/index.html")
});
 
app.get("/hangout", function(req,res){
    res.sendFile(__dirname+"/Public/chat_index.html")
});

app.get("/FitnessTv",function(rq,res){
    res.sendFile(__dirname+"/Public/tv.html")
});
app.get("/MentalWellnessTv",function(rq,res){
    res.sendFile(__dirname+"/Public/welltv.html")
});
app.get("/BMIcalc",function(rq,res){
    res.sendFile(__dirname+"/Public/bmi.html")
});
app.get("/BMIcalcMetric",function(rq,res){
  res.sendFile(__dirname+"/Public/bmi2.html")
});
const PORT = 2000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));