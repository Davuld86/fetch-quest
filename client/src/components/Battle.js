import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from './App';
import './Battle.css'
import Moves from './Moves';
import PlayerStats from './PlayerStats';
export default function Battle({enemy_id, bg='../images/bg.png', setShowBattle }) {
  const [user,setUser] =useContext(UserContext)
  const [character, setCharacter] = useState(user.character[0])
  const [enemy, setEnemy] = useState(null)
  const [userTurn, setUserTurn] = useState(true)
  const [moves, setMoves] = useState(null)
  const [log, setLog] = useState(null)
  const [showMoves, setShowMoves] = useState(true)


  useEffect(()=>{
    fetch(`/api/enemy/${enemy_id}`).then((res)=>{
      if(res.ok){
        res.json().then((d)=>setEnemy(d))
      }
    })
    fetch(`api/moves/${character.job}`).then((res)=>{
      if(res.ok){
        res.json().then((d)=> {setMoves(d)})
      }
    })
  },[])

function handleMove(move){
  if(character.mp >= move.cost) {
    setCharacter({...character, mp : character.mp-move.cost})
    setShowMoves(false)
    setLog(`You attack with: ${move.name}`)
    setTimeout(function(){
    setUserTurn((p)=>!p)
    },2000)
  }

  function handleItem(item){
    console.log(`You used:${item.name}`)
  }

  }

  function enemyAttack(){
    setLog(`${enemy.name} attacks!`)
    setTimeout(function(){
      setUserTurn(true);
      setShowMoves(true)
      },2000)

  }

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
  if (userTurn==false){
    setTimeout(function(){
      enemyAttack()
    },500)
  }
  return (
    <div style={canvasStyle} className='battle-screen'>
      <h1 className='turn'>{userTurn?'Your Turn':'Enemy Turn'}</h1>
       <h3 className='logs'>{log? log: null}</h3>
       <PlayerStats character={character}/>
       <button onClick={handleRunAway}>
          Run!
        </button>


        <div className='battle-character'>
          <img  alt="Character" src={`../images/characters/${character.job}_${character.color}.png`} />
          {moves&&showMoves?<Moves moves={moves} handleMove={handleMove} />:null}
        </div>
        <div className='battle-enemy'>
        <img alt="Enemy" src={enemy.image}/>

        </div>

    </div>
  )
}
}
