import React, { Fragment } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

export default function UploadedGamesCard({game, user, logged }) {    return (
        <div className='game-card'>
            <h4>{game.title}</h4>
            <Link to ={`/play/${game.id}`}>
            <img src={game.thumbnail} style={{maxWidth:'80px'}}></img>
            </Link>
            <div style={{display:'flex'}}>
                <p title={`Rating: ${game.score}`}>⭐: {game.score? parseInt(game.score):0}</p>
                <p title='Favorites'>❤️: {game.favorited_by.length} </p>
                <p title='Total plays'>🎮: {game.playcount? game.playcount:0}</p>
            </div>
            {user==logged?<Link to={`/edit-game/${game.id}`}><button>Edit Game</button></Link>: null}
        </div>
      )
    }
