import React from 'react'

export default function EnemyStats({enemy}) {
  return (
    <div className='enemyStats'>
        <h2 style={{alignSelf:'center'}}>{enemy.name}</h2>
        <div style={{height:'25px', backgroundColor:'red', maxWidth:'200px', minWidth:'0px', border:'7px solid black', borderRadius:'10px', width:`${(enemy.hp/enemy.max_hp>0?enemy.hp/enemy.max_hp:0)*100*.8}%`}}/>
    </div>
  )
}
