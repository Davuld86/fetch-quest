import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from './App';
import './Battle.css'
import Moves from './Moves';
import PlayerStats from './PlayerStats';
import BattleItems from './BattleItems';
import EnemyStats from './EnemyStats';
import VictoryScreen from './VictoryScreen';

export default function Battle({enemy_id, bg='../images/bg.png', closeBattle, showBattle}) {
  const [user,setUser] =useContext(UserContext)
  const [character, setCharacter] = useState(user.character[0])
  const [enemy, setEnemy] = useState(null)
  const [userTurn, setUserTurn] = useState(true)
  const [moves, setMoves] = useState(null)
  const [victory, setVictory] = useState(false)
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


  function enemyAttack(){

    setLog(`${enemy.name} attacks!`)
    setTimeout(function(){
      setUserTurn(true);
      setShowMoves(true)
      },1500)
  }

function handleMove(move){

  if(character.mp >= move.cost) {
    setCharacter({...character, mp : (character.mp-move.cost>=character.max_mp?character.max_mp:character.mp-move.cost)})
    setShowMoves(false)
    setLog(`You attack with: ${move.name}`)
    if(Math.random() <= (move.accuracy/100)){

      setTimeout(function(){
        playerDamageCalc(move)
        setUserTurn((p)=>!p)
        },1500)
    }
    else{
      setLog('Your attack missed!')
      setTimeout(function(){
        setUserTurn((p)=>!p)
        },1500)
    }
   }
  }

  function playerDamageCalc(move){
    const variance = (Math.random() *20 * 2) - 20;
    if(move.type=='physical'){
      const damage = Math.floor((move.base* character.atk)-(enemy.defense*2) +variance)
      setLog(`${enemy.name} lost ${damage} hp`)
      setEnemy({...enemy, hp:enemy.hp - damage})
    }
    else if(move.type=='magic'){
      const damage = Math.floor((move.base* character.matk)-(enemy.defense*2.2) +variance)
      setLog(`${enemy.name} lost ${damage} hp`)
      setEnemy({...enemy, hp:enemy.hp - damage})
    }
  }

  function handleItem(item){
    setShowMoves(false)
    if(item=='hp'){
      setLog(`You used an HP Potion`)
      recover('hp', 150)
    }
    else if (item=='mp'){
      setLog(`You used an MP Potion`)
      recover('mp', 100)
    }
    else{
      setLog('huh?')
    }
    setTimeout(function(){
    setUserTurn((p)=>!p)
    },1000)
  }

  function recover(stat, amt){
    if(stat=='hp'){
      setLog(`You recovered ${amt} HP`)
    }
    else if(stat=='mp'){
      setLog(`You recovered ${amt} MP`)
    }
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

if(showBattle==true){
if(victory){
  return(
    <div style={canvasStyle} className='battle-screen'>
      <VictoryScreen enemy={enemy} character={character} setCharacter={setCharacter} exitBattle={closeBattle}/>
       <div className='battleHeader'>
      <PlayerStats character={character}/>
      <div className='battleInfo'>
      <h1 className='turn'>{userTurn?'Your Turn':'Enemy Turn'}</h1>
       <h3 className='logs'>{log? log: null}</h3>
      </div>
       <EnemyStats enemy={enemy}/>
       </div>
      <div className='battle-character'>
          <img alt="Character" className='battleRaccoon' src={`../images/characters/${character.job}_${character.color}.png`} />
        </div>
    </div>
  )
}
if(character&&enemy){
  if(enemy.hp<=0){
    setLog(`${enemy.name} is slain!`)
    setVictory(true)
  }
  if (userTurn==false){
    if(enemy.hp>0){
      setTimeout(function(){
      enemyAttack()
    },1500)
    }
  }

  return (
    <div style={canvasStyle} className='battle-screen'>
      <div className='battleHeader'>
      <PlayerStats character={character}/>
      <div className='battleInfo'>
      <h1 className='turn'>{userTurn?'Your Turn':'Enemy Turn'}</h1>
       <h3 className='logs'>{log? log: null}</h3>
      </div>

       <EnemyStats enemy={enemy}/>
       </div>
       <button onClick={closeBattle}>
          Run!
        </button>

        <div className='battle-character'>
          <img  alt="Character" className='battleRaccoon' src={`../images/characters/${character.job}_${character.color}.png`} />
          {userTurn&&showMoves?<BattleItems items={user.inventory.filter((item)=>item.category=='battle')} handleItem={handleItem}/>:null}
          {moves&&userTurn&&showMoves?<Moves moves={moves} handleMove={handleMove} />:null}
        </div>
        <div className='battle-enemy'>
        <img alt="Enemy" src={enemy.image}/>

        </div>

    </div>
  )
}
}
}
