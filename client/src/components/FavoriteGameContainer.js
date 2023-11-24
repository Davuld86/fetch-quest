import React from 'react'
import GameCard from './GameCard'
export default function FavoriteGameContainer({games}) {
let game_arr = []
    //build a game arr with all the data for GameCard
    // game.id, title, score, favorited, playcount, thumbnail
   games.forEach(element => {
    let game ={
        'id' : element.id,
        'title' : element.title,
        'score' : element.score,
        'favorited_by': element.favorited_by,
        'playcount': element.playcount,
        'thumbnail': element.thumbnail
    }
    game_arr.push(game)
   });
  return (
    <div style={{display:'grid'}}>
      {game_arr[0]? game_arr.map((game)=> <GameCard key={game.id} game={game}/>):null}
    </div>
  )
}
