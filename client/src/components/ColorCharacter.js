import React, { useState } from 'react'
import './ColorPicker.css'
import ColorCircles from './ColorCircles';

export default function({setColor, job}) {
const menuItems = [1, 2, 3, 4, 5, 6, 7];
const color ={'1':'red','2':'orange','3':'yellow','4':'green', '5':'blue', '6':'indigo', '7':'violet'}
const [charColor, setCharColor]  = useState('1')

return (
  <div>
    <h2>Create your character</h2>
    <h2>Choose a color</h2>
    <div className="circular-menu">
      <div className="center-image">

        <img src={`./images/characters/${job}_${color[charColor]}.png`} className='raccoon' loading='lazy' />
      </div>
      {menuItems.map((item, index) => (
       <ColorCircles key={index} index={index} setCharColor={setCharColor} setColor={setColor} />
      ))}
    </div>
    <br/>
    </div>
  )
  }
