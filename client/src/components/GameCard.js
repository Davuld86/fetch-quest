import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

export default function GameCard({game}) {
  return (
    <div>
        <Link to ={`/play/${game.id}`}>
        <img src={game.thumbnail} style={{maxWidth:'80px'}}></img>
        </Link>
        <p>{game.title}</p>
        <div style={{display:'flex'}}>
            <p>❤️: {game.favorited_by.length} </p>
            <p>🎮: {game.playcount? game.playcount:0}</p>
        </div>
    </div>
  )
}
