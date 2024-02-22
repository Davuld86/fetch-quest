import React, { useState } from 'react'

export default function EnemyMenu({onAttack, onClose}) {





    const menuStyle = {
        position: 'absolute',
        top: '50%',
        left: '60px', // Adjust the distance from the enemy
        transform: 'translateY(-50%)',
        border: '1px solid black',
        padding: '10px',
        backgroundColor: 'white',
        zIndex: '10', // Ensure the menu is above other elements
      };

      return (
        <div className='enemy-menu' style={menuStyle}>
          <button onClick={onClose}>X</button>
          <button onClick={onAttack}>Attack</button>
        </div>
      );


}
