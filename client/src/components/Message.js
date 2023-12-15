import React, { useContext } from 'react'
import { UserContext } from './App'

export default function Message({message, handleDelete}) {
  const [user, setUser] = useContext(UserContext)
    return (
    <div className='message'>
        <img src={message.sender.pfp} className='pfp'/>
        <div className='message-body'>
        <div className='message-header'>
            <h4>{message.sender.username}</h4>
            <p className='timestamp'>{message.timestamp}</p>
            {message.sender.username== user.username? <button title='Delete message' onClick={()=>handleDelete(message.id)}>x</button>:null}
        </div>
        <p className='message-content'>{message.content}</p>
        </div>
    </div>
  )
}
