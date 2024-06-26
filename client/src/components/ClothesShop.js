import React, { useContext, useEffect, useState } from 'react'
import Game from './Game'
import {UserContext, CharacterContext } from './App'
import ScreenTrigger from './ScreenTrigger'
import Merchant from './Merchant'


export default function ClothesShop(){
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
      <Merchant store='clothes' positionX={1250} positionY={350} size={150}/>
      <ScreenTrigger link ={'/game'} width={300} height={100} x={700} y={700} xPos={1100} yPos={480}/>
        <Game char={char} setChar={setChar} area='clothes-shop'/>
    </div>
  )
}

}

