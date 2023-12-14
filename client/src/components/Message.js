import React from 'react'

export default function Message({message}) {
  return (
    <div className='message'>
        <img src={message.sender.pfp} className='pfp'/>
        <div className='message-body'>
        <div className='message-header'>
            <h4>{message.sender.username}</h4>
            <p className='timestamp'>{message.timestamp}</p>
        </div>
        <p className='message-content'>{message.content}</p>
        </div>
    </div>
  )
}
