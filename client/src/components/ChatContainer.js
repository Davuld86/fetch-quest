import React, { useContext, useEffect, useState } from 'react'
import Message from './Message'
import { UserContext } from './App'

export default function ChatContainer({inbox}) {
    const [user, setUser]= useContext(UserContext)
    const [messages, setMessages] = useState([])
    const [msg, setMsg]= useState('')

    useEffect(()=>{
        if (inbox){
             fetch(`/api/messages`)
        .then((res)=>{
          if(res.ok){
            res.json().then((d)=>{setMessages(d.filter(
                (message=>
                    (message.sent_from==user.id && message.sent_to==inbox.owner_id)
                    ||
                    (message.sent_to ==user.id && message.sent_from==inbox.owner_id)))
                )})
          }
        })
        }

     },[inbox])


    function handleSubmit(){
        let m=msg.trim()
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
                    sent_from : user.id,
                    sent_to : inbox.owner_id,
                    content : m,
                })
            }).then((res)=>{
                if(res.ok){
                   res.json().then((d)=> {setMessages([...messages,d])})
                }
            }).then(()=>{
                let f = user.chats.filter((chat)=> chat.owner_id != inbox.owner_id)
                f= [inbox, ...f]
                setUser({...user, chats:f})

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

if(inbox){
    return (
    <div className='chat-container'>
        <h3>{inbox.inbox_owner.username==''? 'No inboxes':`Chat with ${inbox.inbox_owner.username}`}</h3>
        <div className='message-history'>

        {messages? messages.map((message)=> <Message key={message.id} handleDelete={handleDelete} message={message}/>):<p>No messages</p>}
        </div>
        {inbox.id==0?
        <div className='message-input'>
            <form onSubmit={(e)=>{e.preventDefault(); handleSubmit(); setMsg('')}}>
                <input type='text' placeholder={`#message-${inbox.inbox_owner.username}`} onChange={(e)=>setMsg(e.target.value)} value={msg}/>
                <button type='submit'>⬆️</button>
            </form>

        </div>
        :null
        }
    </div>
  )
}
else{
    return(
        <div className='chat-container'>
        <h3> No inboxes</h3>
        <div className='message-history'>

        {messages? messages.map((message)=> <Message key={message.id} handleDelete={handleDelete} message={message}/>):<p>No messages</p>}
        </div>
        <div className='message-input'>
        </div>
    </div>
    )
}

}
