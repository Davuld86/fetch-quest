import React from 'react'

export default function TreeItem({item, placeFurniture, closeMenu}) {
  return (
    <div className='furniture-item' onClick={()=>{placeFurniture(item); closeMenu(false)}}>
        <h5>{item.name}</h5>
        <img src={item.image}/>
    </div>
  )
}
