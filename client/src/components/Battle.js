import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from './App';
import './Battle.css'
export default function Battle({enemy_id, bg='../images/bg.png', setShowBattle }) {
  const [user,setUser] =useContext(UserContext)
  const [character, setCharacter] = useState(user.character[0])
  const [enemy, setEnemy] = useState(null)
  const [userTurn, setUserTurn] = useState(true)


  useEffect(()=>{
    fetch(`/api/enemy/${enemy_id}`).then((res)=>{
      if(res.ok){
        res.json().then((d)=>setEnemy(d))
      }
    })
  },[])

  const canvasStyle = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '1080px',
    height: '720px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    backgroundImage:`url(${bg})`,
    zIndex: '2',
  };

  const handleRunAway = () => {
    setShowBattle(false) // Close the battle menu
  };
if(character&&enemy){
  return (
    <div style={canvasStyle} className='battle-screen'>
      <h1 className='turn'>{userTurn?'Your Turn':'Enemy Turn'}</h1>
       <button onClick={handleRunAway}>
          Run!
        </button>


        <div className='battle-character'>
          <img  alt="Character" src={`../images/characters/${character.job}_${character.color}.png`} />
        </div>
        <div className='battle-enemy'>
        <img alt="Enemy" src={enemy.image} />
        </div>

    </div>
  )
}
}
