import React from 'react'
import "../src/App.css"
import Joinchat from './Components/Joinchat'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Chatroom from './Components/Chatroom'


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Joinchat />} />
        <Route path="/chat" element={<Chatroom />} />
      </Routes>
    </BrowserRouter> 
  )
}

export default App
