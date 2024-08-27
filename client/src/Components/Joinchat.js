import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// import {usestate} from 'react'
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { socket } from '../socket';
import {Helmet} from 'react-helmet'

const Joinchat = () => {
    const joined_audio = new Audio('/joined.mp3');
    const [username, setusername] = useState("");
    const [roomID, setroomID] = useState("");
    const navigate = useNavigate();
    // const [isconnected, setisconnected] = useState(socket.connected);
    const join_chat = () => {
        // setisconnected(true);
        // const socket = io.connect("http://localhost:3001");
        if (username !== "" && roomID !== "") {
      socket.emit("join_room", username,roomID);
    }
        if ((username !== "" && roomID !== "")) {
            joined_audio.play();
            navigate("/chat", { state: {username: username, roomID: roomID, isjoined:true} });
        }
    }
    useEffect(()=>{
        socket.on("notification",(data)=>{
            console.log(data);//here data is {user:'',room:''}
            toast.success(`${data.user} Joined Room`);
        })
    },[])
    return (
        <div className='outer-wrapper'>
        <Helmet>
      <title>
        Chat Hub
      </title>
      <meta name='description' content='get connected with your friends'/>
      <meta name='keywords' content='Chat App, Get Connected, Expand Network'/>
    </Helmet>
            <div className="join_room">
                <h1 className='join_heading'>Join Chat</h1>
                <input type="text" placeholder='Enter Your Name' onChange={(e) => { setusername(e.target.value) }} />
                <input type="text" placeholder='Enter Room ID' onChange={(ev) => { setroomID(ev.target.value) }} onKeyPress={(ev)=>ev.key==="Enter"&&join_chat()} />
                <button onClick={join_chat}>
                    Join
                </button>
            </div>
        </div>
    )
}

export default Joinchat;
