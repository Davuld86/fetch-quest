import React from 'react'
import Message from './Message'

export default function ChatContainer({messages}) {
  return (
    <div className='chat-container'>
        <div className='message-history'>
        {messages? messages.map((message)=> <Message message={message}/>):null}
        </div>

        <div className='message-input'>
        <input type='text' placeholder='....'/>
        <button type='submit'>⬆️</button>
        </div>

    </div>
  )
}
