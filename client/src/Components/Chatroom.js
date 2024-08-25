import React from 'react'
import { socket } from '../socket'
const Chatroom = (params) => {
  return (
    <div className='outer-wrapper'>
    <h1>Welcome {params.username}</h1>
      <div className='chatBox'></div>
    </div>
  )
}

export default Chatroom
