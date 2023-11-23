import React, { useState } from 'react'
import GameContainer from './GameContainer';

export default function SearchPage() {
    const query = window.location.pathname.slice(14)
    const [games, setGames] = useState(null)
    const [loaded, setLoaded] = useState(false)

    function titleize(title){
        return title.replace(/\b\w+/g,function(s){return s.charAt(0).toUpperCase() + s.substr(1).toLowerCase();});
    }
 if(loaded){
    if(games){
        return(
            <div>
                <h1>{query==''? 'Recent Games':`Search Games : "${titleize(query)}"`}</h1>
                <GameContainer games={games}/>
            </div>
        )
    }
 }
 if (games==0){
  return (
    <div>

    </div>
  )
    }
}
