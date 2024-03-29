import React, { useContext, useEffect, useState } from 'react'
import Game from './Game'
import {CharacterContext, UserContext } from './App'
import ScreenTrigger from './ScreenTrigger'
import Merchant from './Merchant'


export default function FunitureShop(){
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

        <Merchant store='furniture' flip={true} size={180} positionX={320} positionY={300}/>
      <ScreenTrigger link ={'/game'} width={300} height={100} x={700} y={700} xPos={490} yPos={480}/>
        <Game char={char} setChar={setChar} area='furniture-shop'/>
    </div>
  )
}

}

