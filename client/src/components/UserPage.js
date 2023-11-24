import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom/cjs/react-router-dom.min'
import GameContainer from './GameContainer'
import DialogueBox from './DialogueBox'
import ReviewContainer from './ReviewContainer'
import FavoriteGameContainer from './FavoriteGameContainer'
import UserReviews from './UserReviews'
import GameGroup from './GameGroup'

export default function UserPage() {
 const userID = Number(window.location.pathname.slice(6))
 const [logged, setLogged]= useState(null)
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
    <div>
        {dialogueBox?<DialogueBox text={'Delete Account?'} text2={'This action cannot be undone.'} handleYes={handleDelete} handleNo={()=>toggleBox(false)}/>:null}
        <div>
        <h2>{user.username}</h2>
        <img src={user.pfp} style={{maxHeight:'150px', borderRadius:'5%'}}/>
          <div>
        <h3>Bio</h3>
        <p>{user.bio}</p>
          </div>
        </div>



        <div>
        <span style={{display:'flex', alignItems:'center'}}>
        <h2>Favorite Games</h2>
        <Link to={`/favorites/${user.id}`}><button>View all favorites</button></Link>
        </span>
        {user?<FavoriteGameContainer games={user.favorites}/>:null}
        </div>

        <GameGroup title={'Created Games'} text={user.posts? <p>View all uploads</p>:null} path={`/uploads/${user.id}`} game_list={user.posts}/>

        <div>
        <span style={{display:'flex', alignItems:'center'}}>
        <h2>Reviews</h2>
        {user.reviews? <Link to={``}><button>View all reviews</button></Link> :null}
        </span>
        {user.reviews?<UserReviews reviews={user.reviews}/>:<p>This user has no reviews</p>}
        </div>

        <div>
          <h2>Account settings:</h2>
        {logged && user.id ==logged.id?<Link to={`/edit-profile/${logged.id}`}><button>Edit profile</button></Link>:null}
        <br/>
        {logged && user.id ==logged.id?<div><button onClick={()=>toggleBox(true)}>Delete Profile</button></div>:null}
        </div>

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
