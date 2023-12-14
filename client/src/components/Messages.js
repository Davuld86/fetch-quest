import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from './App'
import Message from './Message'
import MessageLink from './MessageLink'

import './Messages.css'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import ChatContainer from './ChatContainer'
import Inbox from './Inbox'
export default function Messages() {
    const [user, setUser] = useContext(UserContext)
    const [box, setBox] = useState(0)
    const [messages, setMessages]= useState(null)

if (user){

if (user.chats){
    let m = user.chats.filter((chat)=> chat.id ==box)
    console.log(m[0].messages)
    return (
    <div style={{display:'flex'}} >
        <div style={{display:'flex', flexDirection:'column'}} className='inbox-container'> Inboxes
        {user.chats.map((chat)=>(<Inbox key={chat.id} setBox={setBox} id={chat.id} name={chat.sender.username} pfp={chat.sender.pfp}/>))}
        </div>

        <div className='chat-container'>Messages
            <ChatContainer messages={user.chats.filter((chat)=>chat.id==box)[0].messages}/>
        </div>
    </div>
  )
}
else{
    return (
        <div style={{display:'flex'}}>
            <div style={{display:'flex', flexDirection:'column'}}> Convos
                <ul>
                    <li>users</li>
                    <li>users</li>
                    <li>users</li>
                    <li>users</li>
                </ul>
                </div>
            <div>
                Messages
                <ul>
                    <li>stuff</li>
                    <li>stuff</li>
                    <li>stuff</li>
                    <li>stuff</li>
                    <li>stuff</li>
                </ul>
                </div>

        </div>
      )
}
}
else{
    return <Redirect to='/'/>
}
}
