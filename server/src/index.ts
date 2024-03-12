const express = require("express"); 
const app = express();  
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
  },
});

io.on("connection", (socket: {
  join(): unknown; id: any; on: (arg0: string, arg1: () => void) => void; 
}) => {
  console.log(`User has connected: ${socket.id}`);

  socket.on("join_room", (data: void) => {
    socket.join();
    console.log(`A user with the id ${socket.id} has joined the room ${data}`);
    
  })

  socket.on("disconnect", () => {
    console.log("A User has disconnected", socket.id);
  });
});

server.listen(5000, () => {
  console.log("Server is up and running");
}); 