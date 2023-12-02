import React, { useEffect, useState } from 'react'
import GameContainer from './GameContainer';
import NoneFound from './NoneFound';

import './GameList.css'

export default function CategoryGames() {
const [games,setGames] = useState(null)
const[error, setError] = useState(null)
let category = window.location.pathname.slice(16).toString()
const [isLoaded, setLoaded] = useState(false)



function titleize(title){
    return title.replace(/\b\w+/g,function(s){return s.charAt(0).toUpperCase() + s.substr(1).toLowerCase();});

}

useEffect(() => {

    setLoaded(false)
    setGames(null)
    fetch(`/api/games/${category}/`).then((r) => {
     if (r.ok) {
       r.json().then((games) => setGames(games));
     }
     else{
        setGames(null)
         r.json().then((e)=>setError(e))
     }
     setLoaded(true)
    })
    },[category]);

if(isLoaded){
if (games){
    return (
    <div className='category-page'>
        <h1>{titleize(category)} Games</h1>
        <GameContainer games={games}/>
    </div>
  )
}
else{
    return(
        <div className='category-page'>
        <h1>{titleize(category)} Games</h1>
        <NoneFound title={'No carrots in this patch!'} image={'/images/no_individual_category.png'} text={'No games in that category found'}/>
        </div>
    )
}
}

}
