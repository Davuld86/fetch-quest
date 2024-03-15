import React, { useContext, useEffect, useState } from 'react'
import Game from './Game'
import OWEnemy from './OWEnemy'
import {CharacterContext, UserContext } from './App'
import ScreenTrigger from './ScreenTrigger'

export default function Bridge() {
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
            <OWEnemy positionX={230} positionY={600} flip={true} enemy_id='slime'/>
            <OWEnemy positionX={150} positionY={215} flip={true} enemy_id='brohg'/>
            <OWEnemy positionX={1260} positionY={300} enemy_id='slime'/>
            <ScreenTrigger link ={'/game/forest'} width={300} height={100} x={390} y={80} char={char} setChar={setChar} xPos={780} yPos={580} />
            <ScreenTrigger link ={'/game/crystal-cave'} width={200} height={200} x={1350} y={550} char={char} setChar={setChar} xPos={260} yPos={270} />
            <Game char={char} setChar={setChar} area='bridge'/>
        </div>
      )
    }
}
