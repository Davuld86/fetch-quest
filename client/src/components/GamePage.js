import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
export default function GamePage() {
const gameID = Number(window.location.pathname.slice(6))
const [game, setGame] = useState(null)
const [error, setError] =useState(null)
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
return (
    <div>
        <h1>{game.title}</h1>
        <p>Play Count: {game.playcount? game.playcount.length:0}</p>

    </div>
  )

}
else{
    return(
        <div style={{display:'grid', justifyItems:'center'}}>
            <h1>{error? error.error:null}</h1>
        <img src='../images/not_found.png' style={{maxHeight:'500px'}}></img>
        <h2> Something went wrong</h2>
        <Link to='/'>
        <button style={{height:'50px'}}>Back to homepage</button>
        </Link>
        </div>
    )
}

}
