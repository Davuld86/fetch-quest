import React, {useEffect, useState} from 'react'
import GameContainer from './GameContainer'

export default function Home() {
  const [newGames, setNewGames] = useState(null)
  const [popularGames, setPopularGames] = useState(null)
  const [randomGames,setRandomGames] = useState(null)

  useEffect(() => {
    // grabs game data
    fetch("/all_games").then((r) => {
      if (r.ok) {
        r.json().then((d)=>{
          setNewGames(d)
          setPopularGames(d)
          setRandomGames(d)
        });
      }
    });
  }, []);

  return (
    <div>
    <h1>Home</h1>
    <h3>Thumpin'-New</h3>
    <GameContainer games ={newGames}/>
    <h3>Hop-ular Hits</h3>
    <GameContainer games={popularGames}/>
    <h3>Lucky Picks</h3>
    <GameContainer games={randomGames}/>
  </div>
  )
}



