import React, { useContext, useEffect, useState } from 'react'

import './Friends.css'
import { FriendContext, UserContext } from './App'
import FriendCard from './FriendCard'

export default function FriendContainer() {
    const [user, setUser] = useContext(UserContext)
    const [friends,toggleFriends]= useContext(FriendContext)
    const [f_list, setFList] = useState([])
    useEffect(()=>{
        fetch(`api/friends/${user.id}`).then((res)=>{
            if(res.ok){
                res.json().then((d)=> setFList(d))
            }
        }
    )},[])

    function acceptRequest(id){
        fetch(`/api/friends/${id}`,{
            method:'PATCH',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                status : 'FRIEND'
            })
        })
    }

    function rejectRequest(id){
        fetch(`/api/friends/${id}`,{
            method:'DELETE'
        }).then((res)=>{
            if (res.ok){
                setFList(f_list.filter((friend)=>friend.id!=id))
            }
        })

    }


if(f_list[0]){
  return (
    <div className={friends?'friend-container-active':'friend-container'}>
        <button onClick={()=>toggleFriends((p)=>!p)}>close</button>
        <div className='friends-header'>
        <h2>Friends</h2>
        </div>
        <div className='friends-body'>
        {f_list.map((friend)=>(<FriendCard acceptRequest={acceptRequest} rejectRequest={rejectRequest} key={friend.id} friend={friend}/>))}
        </div>

    </div>
  )
}
else{
    return (
        <div className={friends?'friend-container-active':'friend-container'}>
            <button onClick={()=>toggleFriends((p)=>!p)}>close</button>
            <div className='friends-header'>
            <h2> go and make some friends</h2>
            </div>
        </div>
      )
}
}
