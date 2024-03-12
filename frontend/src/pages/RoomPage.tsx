import { useState } from "react";
import { NavLink } from "react-router-dom";
import * as io from "socket.io-client";

const socket = io.connect("http://localhost:3000");

function Room() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const join = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
    }
  };
  return (
    <>
      <h3>Join a Chat!</h3>
      <input
        type="text"
        placeholder="Username"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Room id or global chat"
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <NavLink to={"/chat"}>
      <button onClick={join}>Join a room</button>
      </NavLink>
    </>
  );
}

export default Room;
