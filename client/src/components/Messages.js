import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from './App'


import './Messages.css'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import ChatContainer from './ChatContainer'
import Inbox from './Inbox'
export default function Messages() {
    const [user, setUser] = useContext(UserContext)
    const [inbox, setBox] = useState({id:0, inbox_owner:{username:''}})

    useEffect(()=>{
        if(user.chats){
            setBox((box)=> box=user.chats[0])
        }
     },[inbox])

     useEffect(()=>{

     },[inbox])

    return (

        <div style={{display:'flex'}}>
            <div style={{display:'flex', flexDirection:'column'}}>
                <h2>Direct Messages</h2>
                    {user.chats?user.chats.map((chat)=> <Inbox key={chat.owner_id} chat={chat} setBox={setBox}/>):null}
                </div>
            <div style={{marginLeft:'20px'}}>
                <h2>Messages</h2>
                <ChatContainer inbox={inbox}/>
                </div>

        </div>
      )
}



