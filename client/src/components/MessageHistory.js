import React, { useEffect, useRef } from 'react'
import Message
 from './Message'
export default function MessageHistory({messages, handleDelete}) {
    const messagesEnd = useRef(null)

    useEffect(()=>{
        scrollToBottom()
    },[messages])

    function scrollToBottom(){
        messagesEnd.current.scrollIntoView({ behavior: "smooth"})
      }

  return (
    <div className='message-history'>
    {messages? messages.map((message)=> <Message key={message.id} handleDelete={handleDelete} message={message}/>):<p>No messages</p>}
    <div className='msgEnd' ref={messagesEnd}/>
    </div>

  )
}
