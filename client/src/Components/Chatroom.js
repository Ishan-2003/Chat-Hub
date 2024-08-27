import React, { useState, useEffect,useRef } from 'react'
import { socket } from '../socket';
// import io from 'socket.io-client'
import ScrollToBottom from 'react-scroll-to-bottom'
import { useLocation,useNavigate } from 'react-router-dom'
import Displayedmessage from './Displayedmessage';
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import {Helmet} from 'react-helmet'

// import Displayedmessage from './Displayedmessage';

// const socket = io.connect("http://localhost:1000")


const Chatroom = () => {
  // const [leave,setleave] = useState(false);
  const sms_voice = new Audio("/outgoing-ringtone.mp3");
  const notification = new Audio("/msg-notification.mp3")
  const location = useLocation();
  const [currentmsg, setcurrentmsg] = useState("Send Hello ...");
  // const [clear, setclear] = useState(false);
  // if(currentmsg!=="") console.log("chatroom",location.state.roomID,location.state.username);
  const [msgList, setMsgList] = useState([]);
  const navigate = useNavigate();
  const leaving = ()=>{
    console.log("leave");
    socket.emit("readytoLeave",location.state.username,location.state.roomID);
    location.state.isjoined = false;
    const leave_track = new Audio('/leaving-chat.mp3');
    leave_track.play();
    navigate('/');
  }
  const sendMsg = async () => {
    // if (currentmsg === "clear") setclear(true);
    if (currentmsg !== "") {
      const messageData = {
        id: Math.random(),
        roomID: location.state.roomID,
        author: location.state.username,
        message: currentmsg,
        time: new Date(Date.now()).getHours() % 24 + ":" + new Date(Date.now()).getMinutes()
      }
      await socket.emit("send_message", messageData)
      setMsgList((list) => [...list, messageData])// here list is the already present messages in msgList
      setcurrentmsg("");
      sms_voice.play();
    }
  }
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMsgList((list) => [...list, data])
      console.log(data);
      notification.play();
    });

    return () => {
      socket.off("receive_message");
    };
  },[socket]);
  useEffect(()=>{
    socket.on("notify",(data)=>{toast.success(`${data.user} left the Room`)})
  },[socket])

  // const haveref = useRef(null);
  // useEffect(()=>{
  //   haveref.current.scrollTop = haveref.current.scrollHeight

  // },[msgList]);
  // console.log("here",location);

  return (location.state.isjoined!==undefined&&location.state.isjoined!==false)?(
    <>
      <div className='outer-wrapper'>
      <Helmet>
      <title>
        Chat Room {location.state.roomID}
      </title>
      <meta name='description' content='Message your connections'/>
      <meta name='keywords' content='Chat App, Get Connected, Expand Network'/>
    </Helmet>
        <h1 style={{ marginTop: "0%" , color:"orange",marginBottom:"1%"}}>Welcome to the Chat {location.state.username}</h1>
        <div className='chatBox'>
          <div className='display-area-outer-wrapper'>
          <ScrollToBottom className='auto-scrolling-div'>
            {
              msgList.map((msg_item) => {
                const author = msg_item.author;
                const msg = msg_item.message;
                const time = msg_item.time;
                const id = msg_item.id;
                return <Displayedmessage author={author} msg={msg} time={time} key={id} id={author===location.state.username?"you":"another-one"} />
              })
            }
          </ScrollToBottom>
          </div>

          <div className='chatTextarea'>
            <input type='text' value={currentmsg} onChange={(event) => { setcurrentmsg(event.target.value); }} onKeyPress={(ev) => (ev.key === "Enter") ? sendMsg() : null}></input>
            <button onClick={sendMsg} className='sending-btn'>
              <img src='/sendinglogo.jpg' alt='Send'></img>
            </button>
          </div>
        </div>
            <button onClick={leaving} className='chatBox leave-btn'>
              <img src="/phonedown.jpg" alt="Leave"/>
            </button>
      </div>
    </>

  ):<div></div>
}

export default Chatroom
