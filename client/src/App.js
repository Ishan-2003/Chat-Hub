import React ,{useState}from 'react'
import "../src/App.css"
import Joinchat from './Components/Joinchat'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Chatroom from './Components/Chatroom'

const App = () => {
  const [joinedroom, setjoinedroom] = useState(false);
  const [username, setusername] = useState("");
  const [room_id, setroom_id] = useState("");
  return (
    <Joinchat/>
  )
}

export default App
