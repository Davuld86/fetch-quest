import React, { useContext, useState } from 'react'
import Message from './Message'
import { UserContext } from './App'

export default function ChatContainer({inbox,messages,handleSubmit, handleDelete}) {
    const [user, setUser]= useContext(UserContext)
    const [msg, setMsg]= useState('')

    return (
    <div className='chat-container'>
        <div className='message-history'>
        <h3>Chat with {inbox.name}</h3>
        {messages? messages.map((message)=> <Message key={message.id} handleDelete={handleDelete} message={message}/>):<p>No messages</p>}
        </div>
        <div className='message-input'>
            <form onSubmit={(e)=>{e.preventDefault(); handleSubmit(msg, user.id); setMsg('')}}>
                <input type='text' placeholder={`#message-${inbox.name}`} onChange={(e)=>setMsg(e.target.value)} value={msg}/>
                <button type='submit'>⬆️</button>
            </form>
        </div>
    </div>
  )
}
