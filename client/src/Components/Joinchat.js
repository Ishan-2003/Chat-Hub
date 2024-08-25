import React, { useState } from 'react'
// import {usestate} from 'react'
import { socket } from '../socket'; 
import Chatroom from './Chatroom';

const Joinchat = () => {
    const [username, setusername] = useState("");
    const [roomID, setroomID] = useState("");
    // const [isconnected, setisconnected] = useState(socket.connected);
    const join_chat = ()=>{
        // setisconnected(true);
        var ct = 0;
        ((username!=="")&&(roomID!==""))?socket.emit("join room",{username,roomID}):ct++;
    }
    return (
        <div className='outer-wrapper'>
            <div className="join_room">
                <h1 className='join_heading'>Join Chat</h1>
                <input type="text" placeholder='Enter Your Name' onChange={(e)=>{setusername(e.target.value)}}/>
                <input type="text" placeholder='Enter Room ID' onChange={(ev)=>{setroomID(ev.target.value)}}/>
                <button onClick={join_chat}>
                    Join
                </button>
            </div>
            <Chatroom username={username} setroomID = {setroomID}/>
        </div>
    )
}

export default Joinchat;
