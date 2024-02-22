import React, { useContext, useEffect, useState } from 'react'
import Game from './Game'
import OWEnemy from './OWEnemy'
import {CharacterContext, UserContext } from './App'
import ScreenTrigger from './ScreenTrigger'

export default function Graveyard() {
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
            <OWEnemy positionX={230} positionY={600} enemy_id='skeleton' flip={true}/>
            <OWEnemy positionX={900} positionY={260} enemy_id='5'/>
            <ScreenTrigger link ={'/game'} width={100} height={200} x={1470} y={500} char={char} setChar={setChar} xPos={180} yPos={400} />
            <ScreenTrigger link ={'/game/boneyard'} width={200} height={200} x={50} y={180} char={char} setChar={setChar} xPos={1342} yPos={500} />
            <Game char={char} setChar={setChar} area='graveyard'/>
        </div>
      )
    }
}
