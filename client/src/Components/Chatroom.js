import React, { useState, useEffect } from 'react'
import { socket } from '../socket';
// import io from 'socket.io-client'
import { useLocation } from 'react-router-dom'
import Displayedmessage from './Displayedmessage';
// import Displayedmessage from './Displayedmessage';

// const socket = io.connect("http://localhost:1000")


const Chatroom = () => {
  const location = useLocation();
  const [currentmsg, setcurrentmsg] = useState("Send Hello ...");
  // if(currentmsg!=="") console.log("chatroom",location.state.roomID,location.state.username);
  const [msgList, setMsgList] = useState([]);
  const sendMsg = async () => {
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
    }
  }
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMsgList((list)=>[...list,data])
      console.log(data);
    });
    return () => {

    };
  }, []);
  // console.log("here",location);

  return (
    <>
      <div className='outer-wrapper'>
        <h1 style={{ marginTop: "0%" }}>Welcome here {location.state.username}</h1>
        <div className='chatBox'>
          {
            msgList.map((msg_item) => {
              const author = msg_item.author;
              const msg = msg_item.message;
              const time = msg_item.time;
              const id = msg_item.id;
              return <Displayedmessage author={author} msg={msg} time={time} key = {id}/>
            })
          }
          <div className='chatTextarea'>
            <input type='text' value={currentmsg} onChange={(event) => { setcurrentmsg(event.target.value); }}></input>
            <button onClick={sendMsg}>Send</button>
          </div>
        </div>
      </div>

    </>
  )
}

export default Chatroom
