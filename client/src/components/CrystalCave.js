import React, { useContext, useEffect, useState } from 'react'
import Game from './Game'
import OWEnemy from './OWEnemy'
import {CharacterContext, UserContext } from './App'
import ScreenTrigger from './ScreenTrigger'

export default function CrystalCave() {
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
            <OWEnemy positionX={750} positionY={300} enemy_id='Royal Dragon' size={350}/>
            <ScreenTrigger link ={'/game/bridge'} width={100} height={100} x={150} y={200} char={char} setChar={setChar} xPos={1220} yPos={550} />
            <Game char={char} setChar={setChar} area='crystal_cave'/>
        </div>
      )
    }
}
