import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import UploadedGamesCard from './UploadedGamesCard'
import NoneFound from './NoneFound'

import './GameList.css'

export default function UploadedGamesContainer({games, user, logged}) {
  if (games[0]==null){
    return <NoneFound text={'This user does not have any uploads'}/>
  }
  else{
    return (
    <div style={{display:'grid'}} className='game-container'>
      {games? games.map((game)=> <UploadedGamesCard key={game.id} game={game} user={user} logged={logged}/>):null}
    </div>
  )
    }
}
