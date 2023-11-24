import React, { useEffect, useState } from 'react'
import NoneFound from './NoneFound'
import GameContainer from './GameContainer'
import FavoriteGameContainer from './FavoriteGameContainer'


export default function UserFavorites() {
    const userID = window.location.pathname.slice(11)
    const[user, setUser] = useState(null)
    const [isLoaded, setLoaded] = useState(null)

    useEffect(() => {
        fetch(`/user/${userID}`).then((r) => {
         if (r.ok) {
           r.json().then((r) => setUser(r));
         }
         else{
             setUser(0)
         }
        }).then(setLoaded(true))
        }, []);

if(isLoaded){
    if(user){
        if(user.favorites[0]){
            return (
                <div>
                    <h1>{user.username}'s Favorite Games</h1>
                    <FavoriteGameContainer games ={user.favorites}/>
                </div>
              )
        }
        return (
            <div>
                <NoneFound title={'No games found'} image={'../images/no_game.png'} text={'This user does not have any favorites'}/>
            </div>
          )
    }
if(user==0){
    return (
    <div>
        <NoneFound title={'No user found'} image={'../images/no_individual_category.png'} text={'This user does not exist'} />
    </div>
  )
}

    }
}
