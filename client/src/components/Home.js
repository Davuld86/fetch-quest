import React, {useEffect, useState} from 'react'
import GameContainer from './GameContainer'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import GameGroup from './GameGroup'

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
      <GameGroup title={"Thumpin' New"} text={'View newest games'} path={`/`} game_list={newGames}/>
      <GameGroup title={'Hop-ular Hits'} text={'View popular games'} path={`/`} game_list={popularGames}/>
      <GameGroup title={'Lucky Picks'} text={'View random games'} path={`/`} game_list={randomGames}/>
  </div>
  )
}



