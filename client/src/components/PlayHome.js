import React, { useEffect, useState } from 'react'
import Battle from './Battle'


export default function PlayHome() {
  const [showBattle, setShowBattle] = useState(false)
  const [enemies, setEnemies] = useState(null)
  const [enemy, setEnemy] = useState(null)

  useEffect(()=>{
    fetch('/api/all_enemies').then((res)=>{
      if(res.ok){
        res.json().then((d)=> setEnemies(d))
      }
})},[])

function startBattle(id){
  setEnemy(id)
  setShowBattle(true)
}

function closeBattle(character, user){
  let ch = character
  setEnemy(null)
  setShowBattle(false)
  fetch(`/api/character/${character.id}`,{
    method:'PATCH',
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify(character)
  })
  fetch(`/api/user/${user.id}`, {
    method:'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      coins: user.coins
    })
  })

}

  return (
    <div>
        <h1>Secret Battle Page!</h1>
        <div style={{display:'flex', flexDirection:'column', alignItems: 'center'}}>
          {enemies? enemies.map((enemy)=>(<button key={enemy.id} onClick={()=>startBattle(enemy.id)}>Fight {enemy.name}</button>)):null}
        </div>

        {enemy?<Battle enemy_id={enemy} showBattle={showBattle} closeBattle={closeBattle}/>:null}
    </div>
  )
}
