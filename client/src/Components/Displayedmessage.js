import React from 'react'
const Displayedmessage = ({author,msg,time,id}) => {
    
  return (
    <>
    <div className='avatar-message' id={id}>
    <div className='avatar'>
      <img src="/scottadkins.jpg" alt="logo" />
    </div>
    <div className='outermost-message-wrapper'>
    <p id='author'>{author}</p>
    <div className='messageWrapper'>
      <div className='Msgcontent'>
        <p>{msg}</p>
      </div>
    </div>
      <div className='Msgmetadata'>
        <p>{time}</p>
      </div>
    </div>

    </div>

    </>
  )
}

export default Displayedmessage
