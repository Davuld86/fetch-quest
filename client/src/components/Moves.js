import React from 'react'
import Move from './Move'

export default function Moves({moves, handleMove}) {
  return (
    <div className='moves'>
      {moves.map((move)=><Move key={move.name} handleMove={handleMove} move={move}/>)}
    </div>
  )
}
