import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from './App'


import './Messages.css'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import ChatContainer from './ChatContainer'
import Inbox from './Inbox'
export default function Messages() {
    const [user, setUser] = useContext(UserContext)
    const [box, setBox] = useState(user?user.chats[0].id:0)
    const [messages, setMessages]= useState(user.chats.filter((chat)=>chat.id==box)[0].messages)

    useEffect(()=>{
        setMessages(user.chats.filter((chat)=>chat.id==box)[0].messages)
    },[box])

    function handleSubmit(msg, inbox, user_id){
        msg=msg.trim()

        if (msg==''){
            console.log('nothing inputted')
        }
        else{
            fetch('/api/send_message',{
                method:'POST',
                headers:{
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({
                    user_id : user_id,
                    inbox_id : inbox,
                    content : msg
                })
            }).then((res)=>{
                if(res.ok){
                   res.json().then((d)=> {setMessages([...messages,d])})
                }
            })
        }

    }

    function handleDelete(message_id){
        fetch(`/api/delete_message/${message_id}`,{
            method: 'DELETE',
        }).then((res)=>{
            if(res.ok){
                setMessages(messages.filter((message)=> message.id != message_id))
            }
        })
    }

if (user){

if (user.chats){
    let m = user.chats.filter((chat)=> chat.id ==box)
    return (
    <div style={{display:'flex'}}>
        <div style={{display:'flex', flexDirection:'column'}} className='inbox-container'>
        <h4>Direct Messages</h4>
        {user.chats.map((chat)=>(<Inbox key={chat.id} setBox={setBox} id={chat.id} name={chat.sender.username} pfp={chat.sender.pfp}/>))}
        </div>

        <div className='chat-container'>Messages
            <ChatContainer handleDelete={handleDelete} name={m[0].sender.username}  inbox_id= {box} handleSubmit={handleSubmit} messages={messages}/>
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

}
