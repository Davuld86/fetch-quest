import React from 'react'

export default function LoggedUser({user}) {
  return (
    <div style={{display:'flex', justifyContent: 'flex-end', alignContent: 'center'}}>
        <button title='View Favorites'>❤️</button>
        <img src={user.pfp} style= {{width: '50px', borderRadius:'50%'}}></img>
        <h4>{user.username}</h4>
        <button>Post Game</button>
    </div>
  )
}
