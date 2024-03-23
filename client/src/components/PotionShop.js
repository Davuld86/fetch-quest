import React, { useContext, useEffect, useState } from 'react'
import Game from './Game'
import {CharacterContext, UserContext } from './App'
import ScreenTrigger from './ScreenTrigger'
import Merchant from './Merchant'


export default function PotionShop(){
const [user, setUser] = useContext(UserContext)
const [char, setChar] = useContext(CharacterContext)
useEffect(()=>{
  fetch(`/api/character/${user.character[0].id}`).then((res)=>{
      if(res.ok){
          res.json().then((d)=> {setChar(d)})
      }
      else{
          setChar(0)
      }
  })
},[])
if(char){
  return (
    <div>
        <Merchant store='battle' positionX={1000} positionY={130} size={160} flip={true}/>
        <ScreenTrigger link ={'/game'} width={300} height={100} x={700} y={700} xPos={810} yPos={480}/>
        <Game char={char} setChar={setChar} area='potion-shop'/>
    </div>
  )
}

}

