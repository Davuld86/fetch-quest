import React, { Fragment, useEffect, useState } from 'react'
import { userDefault } from './default'
import PlayerMenu from './PlayerMenu'

export default function Player({player, chat, setChat}) {
    const c=player.user.character[0]
    const [msg, setMsg] = useState(chat.filter((ch)=> ch.data.id == player.user.id))
    const [x, setX] = useState(c?c.x:400)
    const [flip, setFlip] = useState(false)
    const [showMenu, setShowMenu] = useState(false)

    // makes message disappear after 3s
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

      //flips character towards direction moving
      useEffect(()=>{
        if(x >player.user.character[0].x){
            setFlip(true)
          }
          else if(x<player.user.character[0].x){
            setFlip(false)
          }
          setX(player.user.character[0].x)
      },[player?player.user.character[0].x:x])

    const characterStyle = {
    width: '90px',
    height: '90px',
    position: 'absolute',
    top: `${c.y}px`,
    left: `${c.x}px`,
    transition: 'top 0.3s, left 0.3s',
    }

    return (
    <Fragment>
    <div style={characterStyle} className='other-players' onClick={()=>setShowMenu(!showMenu)}>
      <img className='shadow' src='../images/shadow.png'/>
      <img className='char-img' style={{transform:`scaleX(${flip?-1:1})`, transition:'transform 0.2s',transformStyle:'preserve-3d'}} src={`../images/characters/${c.job}_${c.color}.png`}/>
      <h4 className='charUsername'>{player.user.username}</h4>
      <h4 style={{color:'lime', marginBottom:'-40px', zIndex:'4'}}>{player.user.username}</h4>
      {msg!=''?<div className='textBubble'><p style={{top: `${c.y - 40}px`}}>{msg}</p></div>:null}
      {showMenu&&<PlayerMenu user={player.user} setShowMenu={setShowMenu}/>}
    </div>
    </Fragment>
    )

}



