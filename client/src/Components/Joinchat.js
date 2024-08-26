import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import {usestate} from 'react'
import { socket } from '../socket';


const Joinchat = () => {
    const [username, setusername] = useState("");
    const [roomID, setroomID] = useState("");
    const navigate = useNavigate();
    // const [isconnected, setisconnected] = useState(socket.connected);
    const join_chat = () => {
        // setisconnected(true);
        // const socket = io.connect("http://localhost:3001");
        if (username !== "" && roomID !== "") {
      socket.emit("join_room", roomID);
    }
        if ((username !== "" && roomID !== "")) {
            navigate("/chat", { state: {username: username, roomID: roomID } });
        }
    }

    return (
        <div className='outer-wrapper'>
            <div className="join_room">
                <h1 className='join_heading'>Join Chat</h1>
                <input type="text" placeholder='Enter Your Name' onChange={(e) => { setusername(e.target.value) }} />
                <input type="text" placeholder='Enter Room ID' onChange={(ev) => { setroomID(ev.target.value) }} />
                <button onClick={join_chat}>
                    Join
                </button>
            </div>
        </div>
    )
}

export default Joinchat;
