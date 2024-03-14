// import { IoIosSend, IoMdCloseCircle } from 'react-icons/io';
import { useState } from "react";
import { Socket } from "socket.io-client";
import { Rooms } from "../models/Rooms";
// import { ShowMassege } from "./ShowMassege";
import "../main.css";
import "../Chat.css";

interface IChatMassegeProps {
  socket: Socket | undefined;
  selectedRoom: Rooms | undefined;
  handleClick: (id: string) => void;
  rooms: Rooms[];
}

export const TheChat = ({
  socket,
  selectedRoom,
  handleClick,
  rooms,
}: IChatMassegeProps) => {
  const [userName, setUserName] = useState("");
  const [massege, setMassege] = useState("");

  const [showUsernameAndRoom, setShowUsernameAndRoom] = useState(true);
  const [showChat, setShowChat] = useState(false);

  const sendMassege = () => {
    socket?.emit("send-massege", {
      user: userName,
      roomId: selectedRoom?.id,
      text: massege,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    });
    setMassege("");
  };

  const handleStartChatting = () => {
    if (userName === "" || selectedRoom === undefined) {
      return alert("Välj ett användarnamn samt rum för att gå med i chatten");
    }

    socket?.emit("send_username", userName);

    socket?.on("user_exist", () => {
      alert("Användarnamnet är upptaget");
    });

    socket?.on("show_theChat", () => {
      setShowChat(true);
      setShowUsernameAndRoom(false);
    });
  };

  return (
    <>
      {showUsernameAndRoom && (
        <article className="Username-container">
          <h2 className="Username-container-title">Enter A Name and Room</h2>
          <input
            type="text"
            placeholder="Name..."
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          <select onChange={(e) => handleClick(e.target.value)}>
            <option value="Select genre" selected disabled>
              Select genre
            </option>
            {rooms.map((r) => (
              <option key={r.id} value={r.id}>
                {r.id}
              </option>
            ))}
          </select>
          <button onClick={handleStartChatting}>Next</button>
        </article>
      )}

      {showChat && (
        <>
          <article className="chat-container">
            {/* <h2 className="room-title">Room: {selectedRoom?.name}</h2> */}

            {/* <button onClick={sendMassege}>Send</button> */}

            {selectedRoom?.Chat.map((m) => (
              // return <ShowMassege key={m.roomId} massegeShow={m} />
              <li
                className="message-container"
                key={m.roomId}
                id={m.user === userName ? "you" : "user"}
              >
                {" "}
                <p>{m.text}</p>
                <h6>
                  {m.user}{" "}
                  {new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes()}
                </h6>
                {/* <button onClick={() => {}}>Update</button> */}
              </li>
            ))}
          </article>

          <div className="chat-input-container">
            <input
              type="text"
              placeholder="Message..."
              value={massege}
              onChange={(e) => setMassege(e.target.value)}
            />
            <button onClick={sendMassege}>Send</button>
          </div>
        </>
      )}
    </>
  );
};
