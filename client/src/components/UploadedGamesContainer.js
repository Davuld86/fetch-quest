import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import UploadedGamesCard from './UploadedGamesCard'


export default function UploadedGamesContainer({games, user, logged}) {
  return (
    <div style={{display:'grid'}}>
      {games? games.map((game)=> <UploadedGamesCard key={game.id} game={game} user={user} logged={logged}/>):null}

    </div>
  )
}
