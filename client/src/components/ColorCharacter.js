import React, { useState } from 'react'
import './ColorPicker.css'
import ColorCircles from './ColorCircles';

export default function({setColor}) {
const menuItems = [1, 2, 3, 4, 5, 6, 7];
const color ={'1':'red','2':'orange','3':'yellow','4':'green', '5':'blue', '6':'indigo', '7':'violet'}
const [charColor, setCharColor]  = useState('1')

return (
  <div>
    <h2>Choose a color</h2>
    <div className="circular-menu">
      <div className="center-image">
        <img src={`../images/overlays/overlay_${color[charColor]}.png`} className='img-overlay'/>
        <img src='../images/raccoon.png' className='raccoon' />
      </div>
      {menuItems.map((item, index) => (
       <ColorCircles key={index} index={index} setCharColor={setCharColor} setColor={setColor} />
      ))}
    </div>
    <br/>
    <h3>You'll be able to change this later</h3>
    <button className='charColor' style={{width:'50px', height:'50px', backgroundColor: color[charColor], zIndex:4}}/>
    </div>
  )
  }
