import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import GameContainer from './GameContainer'

export default function GameGroup({title, text, path, game_list}) {
  return (
    <div className='ggheader'>
    <span style={{display:'flex', alignItems:'center'}}>
    <h2>{title}</h2>
    <Link to={path}><button>{text}</button></Link>
    </span>
    {game_list?<GameContainer games={game_list}/>:null}
    </div>
  )
}
