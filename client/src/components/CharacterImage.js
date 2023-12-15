import React from 'react'
import './CharacterImage.css'
export default function CharacterImage({color}) {
  return (
    <div className='character-image'>
        <img src={`../images/overlays/overlay_${color}.png`} className='overlay' />
        <img src={`../images/raccoon.png`} className='raccoon'/>
        <img/>
    </div>
  )
}
