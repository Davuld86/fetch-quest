import React, { useContext, useEffect, useState } from 'react'
import Game from './Game'
import OWEnemy from './OWEnemy'
import {UserContext } from './App'
import ScreenTrigger from './ScreenTrigger'

export default function Forest() {
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

            <ScreenTrigger link ={'/game/clearing'} width={100} height={200} x={1470} y={250} char={char} setChar={setChar} xPos={1330} yPos={540}/>
            <ScreenTrigger link ={'/game'} width={100} height={200} x={65} y={425} char={char} setChar={setChar} xPos={1330} yPos={540}/>
            <ScreenTrigger link ={'/game/bridge'} width={330} height={100} x={700} y={707} char={char} setChar={setChar} xPos={100} yPos={100} />
            <Game char={char} setChar={setChar} area='forest'/>
        </div>
      )
    }
}
