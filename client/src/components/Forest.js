import React, { useContext, useEffect, useState } from 'react'
import Game from './Game'
import OWEnemy from './OWEnemy'
import {CharacterContext, UserContext } from './App'
import ScreenTrigger from './ScreenTrigger'

export default function Forest() {
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
            <OWEnemy positionX={1265} positionY={490} enemy_id='Giant Rat'/>
            <OWEnemy positionX={1070} positionY={110} enemy_id='leaf monster'/>
            <OWEnemy positionX={410} positionY={270} enemy_id='slime'/>
            <ScreenTrigger link ={'/game/clearing'} width={100} height={200} x={1470} y={250} xPos={200} yPos={475}/>
            <ScreenTrigger link ={'/game'} width={100} height={200} x={65} y={425} xPos={1340} yPos={445}/>
            <ScreenTrigger link ={'/game/bridge'} width={330} height={120} x={700} y={680} xPos={518} yPos={190} />
            <Game char={char} setChar={setChar} area='forest'/>
        </div>
      )
    }
}
