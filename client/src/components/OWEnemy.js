import React, { useState } from 'react'
import EnemyMenu from './EnemyMenu';
import Battle from './Battle';

export default function OWEnemy({positionX, positionY, startBattle, enemy_id='1'}) {
    const [showMenu, setShowMenu] = useState(false);
    const [enemy, setEnemy]= useState('')

    const handleEnemyClick = () => {
      setShowMenu(!showMenu);
    };

    const handleAttack = () => {
      setShowMenu(false)
      startBattle(enemy)
    };

    const handleClose = () => {
      setShowMenu(false);
    };

    const enemyStyle = {
        position: 'absolute',
        left: positionX,
        top: positionY,
        width: '50px',
        height: '50px',
      };

      return (
        <div className='enemy' style={enemyStyle} onClick={handleEnemyClick}>
          <h5 style={{color:'red'}}>Enemy</h5>
          <img src='../images/characters/archer_yellow.png'/>
          <img className='shadow' src='../images/shadow.png'/>

      {showMenu && <EnemyMenu onClose={handleClose} onAttack={handleAttack} />}

    </div>
    );
}
