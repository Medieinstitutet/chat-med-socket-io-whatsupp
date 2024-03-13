import { Rooms } from "./models/Rooms";
import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";


let users: string[] = []

let room: Rooms[] = [
    {
        id: "For Fun",
        name: "AAA",
        Chat: [] 
    },
    {
        id: "Single",
        name: "AAA",
        Chat: []
    },
]

const PORT = 3000;
const app = express();

app.use(cors())

app.get("/", (req, res) => {
    res.send("Hello World");
});

const server = createServer(app);
const io = new Server (server, { cors: { origin: "*"}})

io.on("connection", (socket) => {
    console.log("A user is connected")
    
    socket.emit("rooms_list", room.map((r) => {
        return { id: r.id, name: r.id }
        })
    );

    socket.on("join_room", (id: string, callback) => {
        socket.rooms.forEach((room) => {
            console.log("Leaving room", room);
            socket.leave(room)
        });

        console.log("Joining room", id);
        socket.join(id);
        callback(room.find((r) => r.id === id))
    })

    socket.on("send-massege", (massege) => {
      
        const mass = room.find((m) => m.id === massege.roomId);
        mass?.Chat.push(massege);
        console.log("Messege for ypu",massege)

 
        io.to(massege.roomId).emit(
            "massege-accepted",
            room.find((m) => m.id === massege.roomId)
          );
    });

    socket.on("send_username", (username: string) => {

        users.push(username)
        console.log("The user is in users array", users)
    });
});

server.listen(PORT, () => {
    console.log("Server is running")
})