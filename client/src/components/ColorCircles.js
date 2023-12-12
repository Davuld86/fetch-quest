import React from 'react'

export default function ColorCircles({index, setCharColor, setColor}) {
    const color ={'1':'red','2':'orange','3':'yellow','4':'green', '5':'blue', '6':'indigo', '7':'violet'}

    return (
    <button className={`menu-item item-${index + 1}`} onClick={(e)=>{setCharColor(e.target.className.slice(15)); setColor(color[e.target.className.slice(15)])}}/>
  )
}
