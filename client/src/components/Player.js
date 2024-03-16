import React, { useEffect, useState } from 'react'
import { userDefault } from './default'

export default function Player({player, chat, setChat}) {
    const [show, setShow] = useState(false)
    const [msg, setMsg] = useState(chat.filter((ch)=> ch.data.id == player.user.id))

    useEffect(() => {
        if (chat[0]) {
            if(chat[0].data.id==player.user.id){
                setMsg(chat[0].data.message)
            }

            const timer = setTimeout(() => {
            setMsg('');
          }, 3000);
          return () => clearTimeout(timer);
        }
      }, [chat])


    const c=player.user.character[0]

    const characterStyle = {
    width: '90px',
    height: '90px',
    position: 'absolute',
    top: `${c.y}px`,
    left: `${c.x}px`,
    transition: 'top 0.3s, left 0.3s',
    }


    return (
    <div style={characterStyle} className='other-players'>
      <img className='shadow' src='../images/shadow.png'/>
      <img className='char-img' style={{transition:'transform 0.2s',transformStyle:'preserve-3d'}} src={`../images/characters/${c.job}_${c.color}.png`}/>
      <h4 className='charUsername'>{player.user.username}</h4>
      <h4 style={{color:'lime', marginBottom:'-40px', zIndex:'4'}}>{player.user.username}</h4>
      {msg!=''?<div className='textBubble'><p style={{top: `${c.y - 40}px`}}>{msg}</p></div>:null}
    </div>

    )

}



