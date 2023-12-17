import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from './App'


import './Messages.css'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import ChatContainer from './ChatContainer'
import Inbox from './Inbox'
export default function Messages() {
    const [user, setUser] = useContext(UserContext)
    const [box, setBox] = useState(user.chats[0]? user.chats[0].id:0)
    const [messages, setMessages]= useState(null)
    const [isLoading, setLoading] = useState(true)
    const [name, setName] = useState(null)
    const [list, setList] = useState([])

    useEffect(()=>{
        setBox(box)
        fetch(` /api/inbox_messages/${box}`).then((res)=>{
            if(res.ok){
                res.json().then((d)=>(setMessages(d), setName(d.sender.username), setList(d.messages)))
            }
        }).then(
            setLoading(false)
        )

    },[box, list])


    function handleSubmit(msg, inbox, user_id){
        msg=msg.trim()
        console.log(msg, inbox, user_id)
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
                    let m = [messages.messages]
                   res.json().then((d)=> {setList(...list,d)})
                }
            })
        }

    }

    function handleDelete(message_id){
        fetch(`/api/delete_message/${message_id}`,{
            method: 'DELETE',
        }).then((res)=>{
            if(res.ok){
                setList(list.filter((message)=> message.id != message_id))
            }
        })
    }
if(isLoading){
return <h1>Loading...</h1>
}
else if (user){
    return (
    <div>
        <div style={{display:'flex'}}>
        <div style={{display:'flex', flexDirection:'column'}} className='inbox-container'>
        <h4>Direct Messages</h4>
        {user.chats.map((chat)=>(<Inbox key={chat.id} setBox={setBox} id={chat.id} name={chat.sender.username} pfp={chat.sender.pfp}/>))}
        </div>
        <div className='chat-container'>
            {list[0]? <ChatContainer messages={list} name={name} inbox_id={box} handleDelete={handleDelete} handleSubmit={handleSubmit}/>:null}

        </div>

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


