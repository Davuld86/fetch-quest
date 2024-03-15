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
        if(user){
            setBox((box)=> box=user.chats[0])
        }
     },[])

     useEffect(()=>{

     },[inbox])


    function removeBox(id){
        let c = user.chats.filter((chat)=> chat.owner_id != id)
        setUser({...user, chats:c})
        fetch(`/api/inbox/${user.id}/${id}`,{
            method: 'DELETE'
        })
    }
    if(user){
         return (
        <div style={{display:'flex'}}>
            <div style={{display:'flex', flexDirection:'column'}}>
                <h2>Direct Messages</h2>
                    {user.chats[0]?user.chats.map((chat)=> <Inbox key={chat.owner_id} chat={chat} setBox={setBox} removeBox={removeBox}/>):null}
                </div>
            <div style={{marginLeft:'20px'}}>
                <h2>Messages</h2>
                <ChatContainer inbox={inbox}/>
                </div>

        </div>
      )
    }

}



