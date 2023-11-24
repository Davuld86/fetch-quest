import React, { useEffect, useState } from 'react'
import GameContainer from './GameContainer';
import NoneFound from './NoneFound';

export default function SearchPage() {
    const query = window.location.pathname.slice(14)
    const [games, setGames] = useState(null)
    const [loaded, setLoaded] = useState(false)
    const [error, setError] = useState(null)
    const path = query==''?'/api/recent_games':`/api/search/${query}`

    function titleize(title){
        return title.replace(/\b\w+/g,function(s){return s.charAt(0).toUpperCase() + s.substr(1).toLowerCase();});
    }
    useEffect(() => {
        fetch(path).then((r) => {
         if (r.ok) {
           r.json().then((games) => setGames(games));
         }
         else{
            setGames(0)
             r.json().then((e)=>setError(e))
         }
         setLoaded(true)
        })
        },[]);

 if(loaded){
    if(games){
        return(
            <div>
                <h1>{query==''? 'Newest Games':`Search Games : "${titleize(query)}"`}</h1>
                <GameContainer games={games}/>
            </div>
        )
    }
if (games==0){
    return (
        <div>
            <h1>{query==''? 'Newest Games':`Search Games : "${titleize(query)}"`}</h1>
            <NoneFound title={'No carrots in this patch!'} image={'../images/no_individual_category.png'} text={'Try a different search term'}/>
        </div>
        )
    }


}

}
