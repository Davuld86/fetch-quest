import React, { useContext } from 'react'
import { UserContext } from './App'

export default function PlayerStats({character}) {
    const [user, SetUser] = useContext(UserContext)
  return (
    <div className='playerStats' >
        <h2>{user.username}</h2>
        <div style={{display:'flex', flexDirection:'column',}}>
        <h3>HP: {character.hp} / {character.max_hp}</h3>
        <div style={{height:'25px', backgroundColor:'red',maxWidth:'200px', minWidth:'0px', border:'7px solid black', borderRadius:'10px', width:`${(character.hp/character.max_hp)*100*.8}%`}}/>
        </div>
        <div style={{display:'flex', flexDirection:'column',}}>
        <h3>MP: {character.mp} / {character.max_mp}</h3>
        <div style={{height:'25px', backgroundColor:'aqua',maxWidth:'200px', minWidth:'0px', border:'7px solid black', borderRadius:'10px', width:`${(character.mp/character.max_mp)*100*.8}%`}}/>
        </div>
    </div>
  )
}
