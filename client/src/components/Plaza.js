import React, { useContext, useEffect, useState } from 'react'
import Game from './Game'
import OWEnemy from './OWEnemy'
import {CharacterContext, UserContext } from './App'
import ScreenTrigger from './ScreenTrigger'


export default function Plaza(){
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
      <ScreenTrigger link ={'/game/furniture-shop'} width={100} height={130} x={480} y={300} char={char} setChar={setChar} xPos={775} yPos={540}/>
      <ScreenTrigger link ={'/game/potion-shop'} width={100} height={130} x={815} y={300} char={char} setChar={setChar} xPos={775} yPos={540}/>
      <ScreenTrigger link ={'/game/clothes-shop'} width={100} height={130} x={1120} y={340} char={char} setChar={setChar} xPos={775} yPos={540}/>
      <ScreenTrigger link ={'/game/graveyard'} width={100} height={200} x={65} y={350} char={char} setChar={setChar} xPos={1330} yPos={540}/>
      <ScreenTrigger link ={'/game/forest'} width={100} height={200} x={1480} y={400} xPos={200} yPos={480} />
        <Game char={char} setChar={setChar} area='plaza'/>
    </div>
  )
}

}

