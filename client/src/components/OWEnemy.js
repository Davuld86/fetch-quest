import React, { Fragment, useContext, useEffect, useState } from 'react'
import EnemyMenu from './EnemyMenu';
import Battle from './Battle';
import { CharacterContext } from './App';

export default function OWEnemy({positionX, positionY, enemy_id='1', size=100, flip=false}) {
    const [char, setChar] = useContext(CharacterContext)
    const [showMenu, setShowMenu] = useState(false);
    const [showBattle, setShowBattle] = useState(false)
    const [enemy, setEnemy]= useState('')
    const [showEnemy, setShowEnemy] = useState(true)

    useEffect(()=>{
      fetch(`/api/enemy/${enemy_id}`).then((res)=>{
      if(res.ok){
        res.json().then(d=> setEnemy(d))
      }
    })
    },[])

    if(showEnemy==false){
      const timer = setTimeout(() => {
        setShowEnemy(true);
      }, 24000);
    }

    function exitBattle(){
      setShowBattle(false)
    }
    function handleEnemyClick(){
      let c = {
        ...char,
        x:positionX +60,
        y:positionY,
      }
      setChar(c)
      setShowMenu(!showMenu);
    }

    function handleAttack(){
      setShowBattle(true)
      setShowMenu(false)

    }

    function handleClose(){
      setShowMenu(false);
    }

    const enemyStyle = {
        position: 'absolute',
        left: positionX,
        top: positionY,
        maxWidth: `${size}px`,
        maxHeight: `${size}px`,

      }


      return (
        <Fragment>
          {showBattle?<Battle enemy_id={enemy.id} showBattle={showBattle} closeBattle={exitBattle} setShowEnemy={setShowEnemy}/>:null}
          {showEnemy?
          <div className='enemy' style={enemyStyle} onClick={handleEnemyClick}>
          <h4 style={{color:'red', width:'max-content', maxWidth:`${size}px`}}>{enemy.name}</h4>
          <img style={{transform:`scaleX(${flip?-1:1})`}} src={enemy.image}/>
          <img className='shadow' src='../images/shadow.png'/>
          {showMenu && <EnemyMenu onClose={handleClose} onAttack={handleAttack} />}
          </div>:null
          }
        </Fragment>
    )
  }

