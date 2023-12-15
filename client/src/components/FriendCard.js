import React, { useContext, useState } from 'react'
import { UserContext } from './App'

export default function FriendCard({friend, acceptRequest, rejectRequest}) {
    const [frenStatus, setFren] = useState(friend.status)
    const [user, setUser] = useContext(UserContext)
    let f = friend.user_id_1==user.id?friend.user_2:friend.user_1



    if(friend){
        let sent_id = friend[`user_id_${friend.status.slice(8)}`]
    return (
    <div className='friend-card'>
        <div className='friend-data' style={{display:'flex'}}>
        <img src={f.pfp} className='pfp'/>
        <h3>{f.username}</h3>{friend.status=='Friends'?<button onClick={()=>rejectRequest(friend.id)}>unfriend</button>:null}
        </div>
        {frenStatus=='Friends'?<button>message</button>
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
