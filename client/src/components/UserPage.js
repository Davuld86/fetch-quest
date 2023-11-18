import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import GameContainer from './GameContainer'

export default function UserPage() {
 const userID = Number(window.location.pathname.slice(6))
 const [logged, setLogged]= useState(null)
 const [user, setUser] = useState(null)
 const [error, setError]= useState(null)

 useEffect(() => {
    fetch(`/user/${userID}`).then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
      else{
        r.json().then((error)=> setError(error))
      }
      fetch("/check_session").then((r) => {
        if (r.ok) {
          r.json().then((log) => setLogged(log));
        }
      })
    });
  }, []);
  if(user){
  return (
    <div>
        <h2>{user.username}</h2>
        <img src={user.pfp} style={{maxHeight:'100px'}}/>

        <div>
        <h3>Bio</h3>
        <p>{user.bio}</p>
        </div>

        <div>
        <h3>Favorite games</h3>
        <GameContainer games={user.favorites}/>
        </div>

        <div>
            <h3>Created Games</h3>
            {user.posts?<GameContainer games={user.posts}/>:<p>This user has not posted any games</p>}
        </div>
        {logged && user.id ==logged.id?<Link to={`/edit-profile/${logged.id}`}><button>Edit profile</button></Link>:null}
    </div>
  )
}
else if (error){
    return(
        <div style={{display:'grid', justifyItems:'center'}}>
            <h1>{error? error.error:null}</h1>
        <img src='../images/not_found.png' style={{maxHeight:'500px'}}></img>
        <h2>{error.error}</h2>
        <Link to='/'>
        <button style={{height:'50px'}}>Back to homepage</button>
        </Link>
        </div>
    )
}
}
