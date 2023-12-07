import React, {useEffect, useState} from 'react'
import GameGroup from './GameGroup'
import Loading from './Loading'

import './Home.css'
export default function Home() {
  const [newGames, setNewGames] = useState(null)
  const [popularGames, setPopularGames] = useState(null)
  const [randomGames,setRandomGames] = useState(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/all_games").then((r) => {
      if (r.ok) {
        r.json().then((d)=>{
          setNewGames((games)=> games= d.sort((a,b)=>
            b.release_date-a.release_date
        ))
          setPopularGames((games)=> games=d.sort((a,b)=>
             a.favorited_by.length - b.favorited_by.length
        ))
          setRandomGames((games)=> games= d.sort(()=>Math.random() - 0.5))
          setLoading(false)
        });
      }
    });
  }, []);

  if(isLoading){
    return <Loading/>
  }

  else{
      return (
    <div className='home-content'>
      <div className='newgames'>
      <GameGroup title={"Thumpin' New"} text={'View newest games'} path={`/games/sort/new`} game_list={newGames.slice(0,newGames.length >=10? 10: newGames.length)}/>
      </div>

      <div className='popgames'>
      <GameGroup title={'Hop-ular Hits'} text={'View popular games'} path={`/games/sort/popular`} game_list={popularGames.slice(0,newGames.length >=10? 10: newGames.length)}/>
      </div>

      <div className='rangames'>
      <GameGroup title={'Lucky Picks'} text={'View random games'} path={`/games/sort/random`} game_list={randomGames.slice(0,newGames.length >=10? 10: newGames.length)}/>
      </div>
  </div>
  )
  }


}



