import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import EmbedGame from './EmbedGame';
import ReviewContainer from './ReviewContainer';


export default function GamePage() {
const gameID = Number(window.location.pathname.slice(6))
const [game, setGame] = useState(null)
const [error, setError] =useState(null)
const [favorited, toggleFavorite] = useState(false)

useEffect(() => {
    // auto-login
    fetch(`/game/${gameID}/`).then((r) => {
      if (r.ok) {
        r.json().then((d)=> setGame(d));
      }
      else{
        r.json().then((error)=> {setError(error); console.log(error)})
      }
    });
  }, []);
if(game){
const creator = game.created_by
return (
    <div>
        <h1>{game.title}</h1>
        <EmbedGame source={game.path}/>
        <p>Total plays: {game.playcount? game.playcount.length:0}</p>
        <button>Favorite Game</button>
        <p>Published on: {game.release_date}</p>
        <div>

        </div>
        <div>
            <h3>Developed by:</h3>
            <Link to={`/user/${creator.id}`}>
            <h4>{creator.username}</h4>
            <img src={creator.pfp} style={{maxHeight:'60px',borderRadius:'50%'}}></img>
            </Link>
            {creator.bio?<p>{creator.bio}</p> :null}
        </div>
        <ReviewContainer/>
    </div>
  )

}
else if(error){
    return(
        <div style={{display:'grid', justifyItems:'center'}}>
            <h1>{error? error.error:null}</h1>
        <img src='../images/not_found.png' style={{maxHeight:'500px'}}></img>
        <h2>That game isn't available </h2>
        <Link to='/'>
        <button style={{height:'50px'}}>Back to homepage</button>
        </Link>
        </div>
    )
}
}
