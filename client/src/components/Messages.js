import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from './App'


import './Messages.css'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import ChatContainer from './ChatContainer'
import Inbox from './Inbox'
export default function Messages() {
    const [user, setUser] = useContext(UserContext)
    const [inbox, setBox] = useState({name:'', id:0})
    const [list, setList] = useState([])

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

    return (
        <div style={{display:'flex'}}>
            <div style={{display:'flex', flexDirection:'column'}}>
                <h2>Direct Messages</h2>
                    {user.chats.map((chat)=> <Inbox chat={chat} setBox={setBox}/>)}
                    <li>users</li>
                    <li>users</li>
                    <li>users</li>
                    <li>users</li>
                </div>
            <div style={{marginLeft:'20px'}}>
                <h2>Messages</h2>
                <ChatContainer inbox={inbox} handleSubmit={handleSubmit} handleDelete={handleDelete}/>
                </div>

        </div>
      )
}



