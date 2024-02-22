import React, { useContext, useEffect, useState } from 'react'
import Game from './Game'
import OWEnemy from './OWEnemy'
import {CharacterContext, UserContext } from './App'
import ScreenTrigger from './ScreenTrigger'

export default function Clearing() {
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
            <OWEnemy positionX={1100} positionY={240} enemy_id='wood golem' size={200}/>
            <ScreenTrigger link ={'/game/forest'} width={100} height={300} x={60} y={400} xPos={1320} yPos={330}/>
            <Game char={char} setChar={setChar} area='clearing'/>
        </div>
      )
    }
}
