import express from "express";
import { createServer } from "http";
import cors from "cors";
import { Server, Socket } from "socket.io";

const app = express();
app.use(cors());

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on("connection", (socket) => {
  console.log(`User has connected: ${socket.id}`);

  socket.on("join_room", (data: string) => {
    socket.join(data);
    console.log(`A user with the id ${socket.id} has joined the room ${data}`);
  });

  socket.on("disconnect", () => {
    console.log("A User has disconnected", socket.id);
  });
});

server.listen(3000, () => {
  console.log("Server is up and running");
});
