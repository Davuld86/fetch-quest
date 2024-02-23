import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from './App';
import './Battle.css'
import Moves from './Moves';
import PlayerStats from './PlayerStats';
import BattleItems from './BattleItems';
import EnemyStats from './EnemyStats';
import VictoryScreen from './VictoryScreen';
import DefeatScreen from './DefeatScreen';

export default function Battle({enemy_id, bg='../images/bg.png', closeBattle, showBattle, setShowEnemy}) {
  const [user,setUser] =useContext(UserContext)
  const [items, setItems] = useState(user.inventory)
  const [character, setCharacter] = useState(user.character[0])
  const [enemy, setEnemy] = useState(null)
  const [userTurn, setUserTurn] = useState(true)
  const [moves, setMoves] = useState(null)
  const [victory, setVictory] = useState(false)
  const [defeat, setDefeat] = useState(false)
  const [log, setLog] = useState(null)
  const [showMoves, setShowMoves] = useState(true)


  useEffect(()=>{
    fetch(`/api/enemy/${enemy_id}`).then((res)=>{
      if(res.ok){
        res.json().then((d)=>setEnemy(d))
      }
    })
    fetch(`/api/moves/${character.job}`).then((res)=>{
      if(res.ok){
        res.json().then((d)=> {setMoves(d)})
      }
    })
  },[])


  function enemyAttack(){
    setLog(`${enemy.name} attacks!`)
    setTimeout(function(){
      enemyDamageCalc()
      setShowMoves(true)
      },500)
      setUserTurn(true)
  }

  function enemyDamageCalc(){
    const variance = (Math.random() *20 * 2) - 20
    let damage = Math.floor((enemy.atk*3.5)-(character.defense*2) +variance)
    if(damage<=0){
      damage=1
    }
    setLog(`You lost ${damage} HP`)
    if (character.hp-damage<0){
      setCharacter({...character, hp:0})
      setDefeat(true)
    }
    else{
    setCharacter({...character, hp: character.hp-damage})
    }
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
      setTimeout(function(){
        setLog('You missed!')
        setUserTurn((p)=>!p)
        },1500)
    }
   }
  }

  function playerDamageCalc(move){
    const variance = (Math.random() *20 * 2) - 20
    if(move.type=='physical'){
      let damage = Math.floor(((move.base* character.atk)/15)-(enemy.defense*2) +variance)
      if (damage<= 0){
        damage =1
      }
      setLog(`${enemy.name} lost ${damage} HP`)
      setEnemy({...enemy, hp:enemy.hp - damage})
    }
    else if(move.type=='magic'){
      let damage = Math.floor(((move.base* character.matk)/15)-(enemy.defense*2.2) +variance)
      if(damage<=0){
        damage=1
      }
      setLog(`${enemy.name} lost ${damage} HP`)
      setEnemy({...enemy, hp:enemy.hp - damage})
    }
  }

  function playerAnim(){
    //move player in attacking motion
  }

  function enemyAnim(){
    //move enemy in attacking motion
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
    },1500)
  }

  function recover(stat, amt){
    let itemID = null
    if(stat=='hp'){
      setLog(`You recovered ${amt} HP`)
      if(character.hp+amt> character.max_hp){
        setCharacter({...character, hp: character.max_hp})
      }
      else{
        setCharacter({...character, hp: character.hp+amt })
      }
      itemID = items.filter((item)=> item.name =="Hp Potion")[0].id
      let ptns = items.filter((item)=> item.name =="Hp Potion").length>1?items.filter((item)=> item.name =="Hp Potion").pop():[]
      let inventory = items.filter((item)=> item.name !="Hp Potion")
      setItems([...inventory, ptns])
    }
    else if(stat=='mp'){
      setLog(`You recovered ${amt} MP`)
      if(character.mp+amt> character.max_mp){
        setCharacter({...character, mp: character.max_mp})
      }
      else{
        setCharacter({...character, mp: character.mp+amt})
      }
      itemID=items.filter((item)=> item.name =="Mp Potion")[0].id
      let ptns = items.filter((item)=> item.name =="Mp Potion").length>1?items.filter((item)=> item.name =="Mp Potion").pop():[]
      let inventory = items.filter((item)=> item.name !="Mp Potion")
      setItems([...inventory, ptns])
    }
    fetch(`/api/item/${itemID}`, {
      method:'DELETE',
      headers:{'Content-Type':'application/json'}
    })
  }

  const canvasStyle = {
    backgroundImage:`url(${bg})`,
  }

if(showBattle==true){

  if(defeat){
    return(
    <div style={canvasStyle} className='battle-screen'>
    <DefeatScreen exitBattle={closeBattle} setCharacter={setCharacter} character={character}/>
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
    )}

  else if(victory){
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
  else if(character&&enemy){
    if(enemy.hp<=0){
      setLog(`${enemy.name} is slain!`)
      setVictory(true)
      setShowEnemy(false)
    }
    if (userTurn==false&&showMoves==false){
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


          <div className='battle-character'>
            <img  alt="Character" className='battleRaccoon' src={`../images/characters/${character.job}_${character.color}.png`} />
            {userTurn&&showMoves?<BattleItems items={items.filter((item)=>item.category=='battle')} handleItem={handleItem}/>:null}

            {showMoves?<button className='runButton' onClick={()=>closeBattle(character,user)}><img src='../images/run_icon.png' style={{width:'50px'}}></img>Run!</button>:null}
            {moves&&userTurn&&showMoves?<Moves moves={moves} handleMove={handleMove} /> :null}
          </div>
          <div className='battle-enemy'>
          <img alt="Enemy" src={enemy.image}/>

          </div>

      </div>
    )
  }
}
}
