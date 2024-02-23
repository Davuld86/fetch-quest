import React, { useState } from 'react'

export default function EnemyMenu({onAttack, onClose}) {

      return (
        <div className='enemy-menu'>
          <button onClick={onClose}>X</button>
          <button onClick={onAttack}>Battle</button>
        </div>
      );


}
