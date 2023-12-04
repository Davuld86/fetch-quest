import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import GameContainer from './GameContainer'
import DialogueBox from './DialogueBox'
import ReviewContainer from './ReviewContainer'
import FavoriteGameContainer from './FavoriteGameContainer'
import UserReviews from './UserReviews'
import GameGroup from './GameGroup'
import NoneFound from './NoneFound'

import './UserPage.css'

export default function UserPage({logged,setLogged}) {
 const userID = Number(window.location.pathname.slice(14))
 const [user, setUser] = useState(null)
 const [error, setError]= useState(null)
 const[dialogueBox, toggleBox] = useState(false)
 const[deleted, setDeleted] = useState(false)

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

function handleDelete(){
    console.log('Deleting...', logged)
    fetch(`/user/${userID}`,{
        method: 'DELETE'
    }).then((r) =>{
        if (r.ok){
          setUser(null)
          setLogged(null)
          setDeleted(true)
        }
      })

  }

  if(deleted){
    return <Redirect to='/'/>
  }

  if(user){

  return (
    <div className='user-page'>
        {dialogueBox?<DialogueBox text={'Delete Account?'} text2={'This action cannot be undone.'} handleYes={handleDelete} handleNo={()=>toggleBox(false)}/>:null}
        <div className='user-data'>
        <h2>{user.username}</h2>
        <img src={user.pfp} style={{maxHeight:'150px', borderRadius:'5%'}}/>
          <div>
        <h3>Bio</h3>
        <p>{user.bio}</p>
          </div>
        </div>



        <div className='user-favorites'>
        <span style={{display:'flex', alignItems:'center'}}>
        <h2>Favorite Games</h2>
        <Link to={`/favorites/${user.id}`}><button>View all favorites</button></Link>
        </span>
        {user?<FavoriteGameContainer games={user.favorites.slice(0,user.favorites.length >=5? 5: user.favorites.length)}/>:null}
        </div>

        <GameGroup title={'Created Games'} text={user.posts? <p>View all uploads</p>:null} path={`/uploads/${user.id}`} game_list={user.posts.slice(0,user.posts.length >=5? 5: user.posts.length)}/>

        <div className='user-reviews'>
        <span style={{display:'flex', alignItems:'center'}}>
        <h2>Reviews</h2>
        {user.reviews? <Link to={`/user-reviews/${userID}`}><button>View all reviews</button></Link> :null}
        </span>
        {user.reviews?<UserReviews reviews={user.reviews}/>:<p>This user has no reviews</p>}
        </div>

        <div className='user-settings'>
          <h2>Account settings:</h2>
        {logged && user.id ==logged.id?<h3>Edit:</h3>:null}
        {logged && user.id ==logged.id?<Link to={`/edit-profile/${logged.id}`}><button>Edit profile</button></Link>:null}
        <br/>
        {logged && user.id ==logged.id?<h3>Delete Account:</h3>:null}
        {logged && user.id ==logged.id?<div><button onClick={()=>toggleBox(true)}>Delete Account</button></div>:null}
        </div>

       </div>

  )
}
else if (error){
    return(
          <NoneFound title={error? error.error:null} image={'../images/not_found.png' } text={'This user does not exist'}/>
    )
}
}
