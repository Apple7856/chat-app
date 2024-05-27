import { Server } from "socket.io";

const io = new Server({
  cors: "http://localhost:3000",
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.", users);

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("user join the room", room);
  });

  socket.on("new message", (newMessageRecieved) => {
    let members = newMessageRecieved.members;
    if (!newMessageRecieved.members)
      return console.log("chat users not defined");

    members.forEach((user) => {
      if (user._id === newMessageRecieved.sender_id._id) return;
      delete newMessageRecieved.members;
      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });
});

io.listen(4000);
