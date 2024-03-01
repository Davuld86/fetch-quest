import React, { useContext, useState } from 'react'
import { UserContext } from './App'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

export default function FriendCard({friend, acceptRequest, rejectRequest}) {
    const [frenStatus, setFren] = useState(friend.status)
    const [user, setUser] = useContext(UserContext)
    let f = friend.user_id_1==user.id?friend.user_2:friend.user_1

    function openInbox(id_1, id_2){
        let owner = id_2
        if(id_2==user.id){
            owner = id_1
        }
        fetch(`/api/inbox/${user.id}/${owner}`,{
            method:'POST',
            headers:{'Content-Type':'application/json'},
        }).then((res)=>{
            if(res.ok){
                res.json().then((d)=>{setUser({...user, chats:[d,...user.chats]})})
            }
        })
    }



    if(friend){
        let sent_id = friend[`user_id_${friend.status.slice(8)}`]
    return (
    <div className='friend-card'>
        <div className='friend-data' style={{display:'flex'}}>
        <img src={f.pfp} className='pfp'/>
        <h3>{f.username}</h3>{friend.status=='Friends'?<button onClick={()=>rejectRequest(friend.id)}>unfriend</button>:null}
        </div>
        {frenStatus=='Friends'?<Link to='/messages'><button onClick={()=>openInbox(friend.user_id_1, friend.user_id_2)}>message</button></Link>
        :sent_id==user.id?
            <div className='friend-buttons'>
            <button onClick={()=>{acceptRequest(friend.id); setFren('Friends') }}>accept</button>
            <button onClick={()=>rejectRequest(friend.id)}>reject</button>
            </div>
        :<h4>pending</h4>
        }
        </div>
  )
}
}
