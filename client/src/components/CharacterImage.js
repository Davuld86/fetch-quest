import React from 'react'
import './CharacterImage.css'
export default function CharacterImage({color, job}) {
  return (
    <div className='character-image'>
        <img className='hat'/>
        <img src={`../images/characters/${job}_${color}.png`} className='raccoon' loading='lazy' />
    </div>
  )
}
