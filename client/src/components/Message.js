import React, { useContext } from 'react'
import { UserContext } from './App'

export default function Message({message, handleDelete}) {
  const [user, setUser] = useContext(UserContext)
  const date = new Date(message.timestamp)
    return (
    <div className='message'>
        <img src={message.sender.pfp} className='pfp'/>
        <div className='message-body'>

        <div className='message-header'>
        <h3>{message.sender.username}</h3>
        <p className='timestamp'>{date.toLocaleDateString()}</p>
        {message.sender.username== user.username? <button title='Delete message' onClick={()=>handleDelete(message.id)}>x</button>:null}
        </div>

        <p className='message-content'>{message.content}</p>
        </div>
    </div>
  )
}
