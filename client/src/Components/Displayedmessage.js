import React from 'react'


const Displayedmessage = ({author,msg,time}) => {
    
  return (
    <div className='messageWrapper'>
      <div className='Msgcontent'>
        <p>{msg}</p>
      </div>
      <div className='Msgmetadata'>
        <p>{author}</p>
        <p>{time}</p>
      </div>
    </div>
  )
}

export default Displayedmessage
