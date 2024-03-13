// import { IoIosSend, IoMdCloseCircle } from 'react-icons/io';
import { ChangeEvent, useState } from "react"
import { Socket } from "socket.io-client"
import { Rooms } from '../models/Rooms';
// import { ShowMassege } from "./ShowMassege";

interface IChatMassegeProps {
    socket: Socket | undefined
    selectedRoom: Rooms | undefined
    handleClick: (id: string) => void
    chatRooms: Rooms[]

};

export const TheChat = ({ socket, selectedRoom, handleClick, chatRooms }: IChatMassegeProps) => {
    const [userName, setUserName] = useState("");
    const [massege, setMassege] = useState("")

    const [showUsername, setShowUsername] = useState(true);
    const [showGenreOptions, setShowGenreOptions] = useState(false);
    const [showChat, setShowCat] = useState(false);

    const senMassege = () => {
        socket?.emit("send-massege", {
            user: userName,
            roomId: selectedRoom?.id,
            text: massege,
            time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
        });
        setMassege("")
    };

    const handleGenre = () => {
    
        socket?.emit("send_username", userName);
                setShowUsername(false);
                setShowGenreOptions(true);
    }

    const chat = (e: ChangeEvent<HTMLSelectElement>) => {
        handleClick(e.target.value)
        setShowGenreOptions(false)
        setShowCat(true)
    }


  
    return <>
        {showUsername && (
            <article>
                <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)} />

                <button onClick={handleGenre}>Next</button>
            </article>
        )}

        {showGenreOptions && (
            <article>
                <select onChange={chat}>
                    <option value="Select genre" selected disabled>Select genre</option>
                    {chatRooms.map((r) => (
                        <option key={r.id} value={r.id}>{r.name}</option>
                    ))}
                </select>
            </article>
        )}

        {showChat && (
            <article>
                <h2>{userName}</h2>
                <input
                    type="text"
                    value={massege}
                    onChange={(e) => setMassege(e.target.value)} />

                <button onClick={senMassege}>Send</button>

                <ul>
                    {selectedRoom?.Chat.map((m) => (
                        // return <ShowMassege key={m.roomId} massegeShow={m} />
                        <li key={m.roomId}
                            id={m.user === userName ? "you" : "user"}> <h6>{m.user} {new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()}</h6>
                            {m.text}
                            <button onClick={() => {}}>Update</button>
                        </li>
                    ))}
                </ul>

            </article>
        )}

    </>
};