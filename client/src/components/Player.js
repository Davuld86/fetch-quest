import React from 'react'
import { userDefault } from './default'

export default function Player({player}) {

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
    <div style={characterStyle} className='character'>
      <img className='shadow' src='../images/shadow.png'/>
      <img className='char-img' style={{transition:'transform 0.2s',transformStyle:'preserve-3d'}} src={`../images/characters/${c.job}_${c.color}.png`}/>
      <h4 className='charUsername'>{player.user.username}</h4>
      <h4 style={{color:'gold', marginBottom:'-40px', zIndex:'4'}}>{player.user.username}</h4>
    </div>

    )

}



