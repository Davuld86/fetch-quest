import React from 'react'
import GameCard from './GameCard'

export default function GameContainer({games}) {
  return (
    <div style={{display:'grid'}}>
      {games? games.map((game)=> <GameCard key={game.id} game={game}/>):null}
    </div>
  )
}
