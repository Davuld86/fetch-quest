import React from 'react'
import GameCard from './GameCard'
export default function FavoriteGameContainer({games}) {
let game_arr = []


    //build a game arr with all the data for GameCard
    // game.id, title, score, favorited, playcount, thumbnail
   games.forEach(element => {
    let game ={
        'game_id' : element.game_id,
        'title' : element.game_favorites.title,
        'score' : element.game_favorites.score,
        'favorited_by': element.game_favorites.favorited_by,
        'playcount': element.game_favorites.playcount,
        'thumbnail': element.game_favorites.thumbnail
    }
    game_arr.push(game)
   });
  return (
    <div style={{display:'grid'}}>
      {game_arr[0]? game_arr.map((game)=> <GameCard key={game.game_id} game={game}/>):null}
    </div>
  )
}
