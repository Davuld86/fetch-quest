import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import EmbedGame from './EmbedGame';
import ReviewContainer from './ReviewContainer';
import CategoryBar from './CategoryBar';
import Loading from './Loading';


export default function GamePage() {
const gameID = Number(window.location.pathname.slice(6))
const [game, setGame] = useState(null)
const [error, setError] =useState(null)
const [user, setUser] = useState(null)
const [favorited, toggleFavorite] = useState(false)
const [favTally, setTally] = useState(null)
const [isLoading, setLoading] = useState(true)

useEffect(() => {
    fetch(`/game/${gameID}/`).then((r) => {
      if (r.ok) {
        r.json().then((d)=> {
          setGame(d)
          setTally(d.favorited_by.length)
        });
      }
      else{
        r.json().then((error)=> {setError(error); console.log(error)})
      }
    })
    .then(
        fetch("/check_session").then((r) => {
          if (r.ok) {
            r.json().then((user) => {
              setUser(user)
              checkFavorites(user)
              setLoading(false)
            });
          }

        })
      );
  }, []);

function checkFavorites(user){
  let fav = user.favorites.filter((fave)=> fave.id == gameID)
  fav[0]? toggleFavorite(true): toggleFavorite(false)
}

function handleFavorite(){
  toggleFavorite((prev)=> !prev)
  favorited? setTally((prev)=> prev= prev-1):setTally((prev)=> prev= prev+1)

  fetch(`/api/favorite_game/${user.id}/${game.id}`,{
    method: 'PATCH',
    headers:{
      'Content-type':'application/json'
    },
    body: JSON.stringify({
      user_id: user.id,
      game_id: gameID
    })
}).then((r) =>{
    if (r.ok){
      console.log('ok')
    }
  })

}
if(isLoading){
  return <Loading/>
}
if(game){

const creator = game.created_by
return (
    <div style={{display:'grid'}}>
        <div style={{display:'grid', justifyContent:'center'}}>
        <h1>{game.title}</h1>
        <EmbedGame source={game.path}/>
        <span style={{display:'flex'}}>
        <p>Score: {game.score} </p>
        <p>Favorites: {favTally} </p>
        <p>Total plays: {game.playcount? game.playcount:0} </p>
        <p>Published: {game.release_date} </p>
        </span>
        {user?<button onClick={()=>handleFavorite()}>{favorited?'Unfavorite':'Favorite'} Game</button>:null}
        <CategoryBar categories={game.categories}/>
        {game.description?<p>{game.description}</p>:null}
        </div>
        <div>
            <h3>Developed by:</h3>
            <Link to={`/user/${creator.id}`}>
            <h4>{creator.username}</h4>
            <img src={creator.pfp} style={{maxHeight:'60px',borderRadius:'50%'}}></img>
            </Link>
            {creator.bio?<p>{creator.bio}</p> :null}
            {creator.id ==user.id?<Link to={`/edit-game/${game.id}`}><button>Edit Game</button></Link>:null}
        </div>
        <ReviewContainer gameID={gameID} game={game} user={user}/>
    </div>
  )

}
else if(error){
    return(
        <div style={{display:'grid', justifyItems:'center'}}>
            <h1>{error? error.error:null}</h1>
        <img src='../images/no_game.png' style={{maxHeight:'500px'}}></img>
        <h2> This game does not exist.</h2>
        <Link to='/'>
        <button style={{height:'50px'}}>Back to homepage</button>
        </Link>
        </div>
    )
}
}
