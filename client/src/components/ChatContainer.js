import React, { useContext, useEffect, useRef, useState } from 'react'
import Message from './Message'
import { SocketContext, UserContext } from './App'
import MessageHistory from './MessageHistory'


export default function ChatContainer({inbox}) {
    const socket = useContext(SocketContext)
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

     useEffect(() => {
        socket.on("message", (data) => {
            if((data.sent_from==user.id && data.sent_to==inbox.owner_id)
            ||
            (data.sent_to ==user.id && data.sent_from==inbox.owner_id)){
               setMessages(()=>[...messages,data])
            }


        })

        socket.on('delete_message',(data)=>{
            setMessages(messages.filter((message)=> message.id != data.id))
        })
        return () => {
          socket.off("data", () => {
            console.log("data event was removed");
          })
        }

      }, [socket, messages])


      useEffect(()=>{

      },[messages])

    function handleSubmit(){
        let m=msg.trim()
        if (msg==''){
        }
        else{
            socket.emit('message', {sent_from : user.id,
                sent_to : inbox.owner_id,
                content : m,})
                let f = user.chats.filter((chat)=> chat.owner_id != inbox.owner_id)
                f= [inbox, ...f]
                setUser({...user, chats:f})
        }
    }

    function handleDelete(message_id){
        socket.emit('delete_message', {id:message_id})
    }

if(inbox){
    return (
    <div className='chat-container'>
        <h3>{inbox.inbox_owner.username==''? 'No inboxes':`Chat with ${inbox.inbox_owner.username}`}</h3>
        <MessageHistory messages={messages} handleDelete={handleDelete}/>

        {inbox.id!=0?
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
    </div>
    )
}

}
