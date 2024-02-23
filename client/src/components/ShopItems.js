import React, { Fragment, useState } from 'react'
import AlertBox from './AlertBox'

export default function ShopItems({item, buyItem}) {

  return (
    <Fragment>
    <div className='item-card'>
        <h2>{item.name}</h2>
        <img src={item.image}/>
        <h2>{item.price}🪙</h2>
        <button onClick={()=>{buyItem(item)}}>Buy Item</button>
    </div>
    </Fragment>
  )
}
