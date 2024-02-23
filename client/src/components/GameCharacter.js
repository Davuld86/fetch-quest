import React, { useContext } from 'react'
import { UserContext } from './App';

export default function GameCharacter({position, message, show, flip=false}) {
    const[user, setUser] = useContext(UserContext)
    const c=user?user.character[0]:{job:'archer', color:'red'}

    const characterStyle = {
    width: '90px',
    height: '90px',
    position: 'absolute',
    top: `${position.y}px`,
    left: `${position.x}px`,
    transition: 'top 0.3s, left 0.3s',
    visibility: show?'visible':'hidden'
  }

if(user){
     return (
    <div style={characterStyle} className='character'>
      <img className='shadow' src='../images/shadow.png'/>
      <img className='char-img' style={{transform:`scaleX(${flip?-1:1})`, transition:'transform 0.2s',transformStyle:'preserve-3d'}} src={`../images/characters/${c.job}_${c.color}.png`}/>
      <h4 className='charUsername'>{user.username}</h4>
      <h4 style={{color:'gold', marginBottom:'-40px', zIndex:'4'}}>{user.username}</h4>
      {message?<div className='textBubble'><p style={{top: `${position.y - 40}px`}}>{message}</p></div>:null}
    </div>

  )
}



}

