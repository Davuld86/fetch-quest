import React, { useContext, useEffect, useState } from 'react'
import Game from './Game'
import OWEnemy from './OWEnemy'
import {CharacterContext, UserContext } from './App'
import ScreenTrigger from './ScreenTrigger'

export default function Boneyard() {
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
            <OWEnemy positionX={370} positionY={310} enemy_id='gargoyle' size={250} flip={true}/>
            <ScreenTrigger link ={'/game/graveyard'} width={100} height={200} x={1480} y={475} xPos={300} yPos={220} />
            <Game char={char} setChar={setChar} area='boneyard'/>
        </div>
      )
    }
}
