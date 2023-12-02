import React, { useEffect, useState } from 'react'
import GameContainer from './GameContainer';
import NoneFound from './NoneFound';
import { useHistory } from "react-router";
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

import './GameList.css'

export default function SearchPage() {
    let query = window.location.pathname.slice(14).replaceAll('%20',' ')
    const [games, setGames] = useState(null)
    const [loaded, setLoaded] = useState(false)
    const [error, setError] = useState(null)
    let location = useLocation()

    function titleize(title){
        return title.replace(/\b\w+/g,function(s){return s.charAt(0).toUpperCase() + s.substr(1).toLowerCase();});
    }
    useEffect(() => {

        const path = query==''?'/api/recent_games':`/api/search/${query}`
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
        },[location]);

 if(loaded){
    if(games){
        return(
            <div className='search-page'>
                <h1>{query==''? 'All Games':`Search Games : "${titleize(query)}"`}</h1>
                <GameContainer games={games}/>
            </div>
        )
    }
if (games==0){
    return (
        <div className='search-page'>
            <h1>{query==''? 'All Games':`Search Games : "${titleize(query)}"`}</h1>
            <NoneFound title={'No carrots in this patch!'} image={'../images/no_individual_category.png'} text={'Try a different search term'}/>
        </div>
        )
    }


}

}
