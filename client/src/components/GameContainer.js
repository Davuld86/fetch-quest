import React from 'react'
import GameCard from './GameCard'

export default function GameContainer({games}) {

  return (
    <div className='game-container'>
      {games? games.map((game)=> <GameCard key={game.id} game={game}/>):null}
    </div>
  )
}
