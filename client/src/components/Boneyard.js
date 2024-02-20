import React, { useContext, useEffect, useState } from 'react'
import Game from './Game'
import OWEnemy from './OWEnemy'
import {UserContext } from './App'
import ScreenTrigger from './ScreenTrigger'

export default function Boneyard() {
    const [user, setUser] = useContext(UserContext)
    const [char, setChar] = useState(null)
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
            <OWEnemy positionX={450} positionY={400} enemy_id='4' size={130} flip={true}/>
            <ScreenTrigger link ={'/game/graveyard'} width={100} height={200} x={1470} y={500} char={char} setChar={setChar} xPos={100} yPos={100} />
            <Game char={char} setChar={setChar} area='boneyard'/>
        </div>
      )
    }
}
