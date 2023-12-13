import React, { useContext } from 'react'

import './Friends.css'
import { FriendContext } from './App'

export default function FriendContainer() {
    const [friends,toggleFriends]= useContext(FriendContext)
  return (
    <div className={friends?'friend-container-active':'friend-container'}>
        <button onClick={()=>toggleFriends((p)=>!p)}>close</button>
        <div className='friends-header'>
        <h2>Friends</h2>
        </div>


    </div>
  )
}
