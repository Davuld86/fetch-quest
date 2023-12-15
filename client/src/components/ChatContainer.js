import React, { useContext, useState } from 'react'
import Message from './Message'
import { UserContext } from './App'

export default function ChatContainer({inbox_id,messages,name, handleSubmit, handleDelete}) {
    const [user, setUser]= useContext(UserContext)
    const [msg, setMsg]= useState('')
    return (
    <div className='chat-container'>
        <div className='message-history'>
        <h3>Chat with {name}</h3>
        {messages? messages.map((message)=> <Message handleDelete={handleDelete} message={message}/>):null}
        </div>
        <div className='message-input'>
            <form onSubmit={(e)=>{e.preventDefault(); handleSubmit(msg, inbox_id, user.id); setMsg('')}}>
                <input type='text' placeholder={`#message-${name}`} onChange={(e)=>setMsg(e.target.value)} value={msg}/>
                <button type='submit'>⬆️</button>
            </form>
        </div>
    </div>
  )
}
