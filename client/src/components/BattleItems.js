import React from 'react'

export default function BattleItems({items, handleItem}) {
  let hp = items.filter((item)=> item.name =="Hp Potion").length
  let mp = items.filter((item)=> item.name == "Mp Potion").length

  return (
    <div className='battleItemContainer' style={{}}>

    <div onClick={()=> {if(hp>0){handleItem('hp'); hp=hp-1}}} className='batItem'>
        <img src={'../images/shop/hp.png'} style={{width:'50px'}}/>
        <h3>{hp}</h3>
        <p>HP Potion</p>
      </div>

      <div onClick={()=>{if(mp>0){handleItem('mp');mp=mp-1}}} className='batItem'>
        <img src={'../images/shop/mp.png'} style={{width:'50px'}}/>
        <h3>{mp}</h3>
        <p>MP Potion</p>

      </div>

    </div>
  )
}
