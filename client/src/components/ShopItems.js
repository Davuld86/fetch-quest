import React from 'react'

export default function ShopItems({item, buyItem}) {
  return (
    <div className='item-card'>
        <h2>{item.name}</h2>
        <img src={item.image}/>
        <h2>{item.price}🪙</h2>
        <button onClick={()=>buyItem(item.id, item.price)}>Buy Item</button>
    </div>
  )
}
