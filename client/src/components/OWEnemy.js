import React, { Fragment, useEffect, useState } from 'react'
import EnemyMenu from './EnemyMenu';
import Battle from './Battle';

export default function OWEnemy({positionX, positionY, enemy_id='1', size=100, flip=false}) {
    const [showMenu, setShowMenu] = useState(false);
    const [showBattle, setShowBattle] = useState(false)
    const [enemy, setEnemy]= useState('')

    useEffect(()=>{
      fetch(`/api/enemy/${enemy_id}`).then((res)=>{
      if(res.ok){
        res.json().then(d=> setEnemy(d))
      }
    })
    },[])

    function exitBattle(){
      setShowBattle(false)
    }
    function handleEnemyClick(){
      setShowMenu(!showMenu);
    };

    function handleAttack(){
      setShowBattle(true)
      setShowMenu(false)
    };

    function handleClose(){
      setShowMenu(false);
    };

    const enemyStyle = {
        position: 'absolute',
        left: positionX,
        top: positionY,
        maxWidth: `${size}px`,
        maxHeight: `${size}px`,

      };

      return (
        <Fragment>
          {showBattle?<Battle enemy_id={enemy.id} showBattle={showBattle} closeBattle={exitBattle}/>:null}

          <div className='enemy' style={enemyStyle} onClick={handleEnemyClick}>
          <h5 style={{color:'red', width:'max-content', maxWidth:`${size}px`}}>{enemy.name}</h5>
          <img style={{transform:`scaleX(${flip?-1:1})`}} src={enemy.image}/>
          <img className='shadow' src='../images/shadow.png'/>
          {showMenu && <EnemyMenu onClose={handleClose} onAttack={handleAttack} />}
          </div>
        </Fragment>
    );
}
