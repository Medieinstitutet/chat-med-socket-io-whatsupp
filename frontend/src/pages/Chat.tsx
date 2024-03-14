import { Socket, io } from "socket.io-client";
import { useEffect, useState } from "react";
import { Rooms } from "../models/Rooms";
import { TheChat } from "../components/TheChat";
import "../Chat.css";

export const Chat = () => {
  const [socket, setSocket] = useState<Socket>();
  const [rooms, setRooms] = useState<Rooms[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Rooms>();

  useEffect(() => {
    if (socket) return;

    const s = io("http://localhost:3000");

    s.on("rooms_list", (rooms: Rooms[]) => {
      setRooms(rooms);
    });

    s.on("massege-accepted", (room: Rooms) => {
      setSelectedRoom(room);
    });

    setSocket(s);
  }, [setSocket, socket]);

  const handleClick = (id: string) => {
    socket?.emit("join_room", id, (room: Rooms) => {
      console.log("Joined room", room);
      setSelectedRoom(room);
    });
  };

  return (
    <>
      <section>
        <TheChat
          socket={socket}
          selectedRoom={selectedRoom}
          handleClick={handleClick}
          chatRooms={rooms}
        />
      </section>
    </>
  );
};
