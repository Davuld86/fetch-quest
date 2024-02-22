import React, { Fragment, useState } from 'react'
import AlertBox from './AlertBox'

export default function ShopItems({item, buyItem}) {
  const [showBox, setShowBox] = useState(false)
  if(showBox){
    setTimeout(() => {
      setShowBox(false);
    }, 3000);
  }
  return (
    <Fragment>
      { showBox?<AlertBox message={`You bought a ${item.name}`}/>:null}
    <div className='item-card'>
        <h2>{item.name}</h2>
        <img src={item.image}/>
        <h2>{item.price}🪙</h2>
        <button onClick={()=>{buyItem(item.id, item.price); setShowBox(true)}}>Buy Item</button>
    </div>
    </Fragment>
  )
}
