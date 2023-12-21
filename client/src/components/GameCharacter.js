import React, { useContext } from 'react'
import { UserContext } from './App';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

export default function GameCharacter({position, message}) {
    const[user, setUser] = useContext(UserContext)
    const c=user?user.character[0]:{job:'archer', color:'red'}
    const characterStyle = {
    width: '90px',
    height: '90px',
    position: 'absolute',
    top: `${position.y}px`,
    left: `${position.x}px`,
    transition: 'top 0.3s, left 0.3s',
  };
if(user){
     return (
    <div style={characterStyle} className='character'>
        {message?<p style={{top: `${position.y - 40}px`}}>{message}</p>:null}
        <h4>{user.username}</h4>
        <img src={`../images/characters/${c.job}_${c.color}.png`}/>
        <img className='shadow' src='../images/shadow.png'/>
    </div>

  )
}



}
