import React, { useContext } from 'react'
import { UserContext } from './App'

export default function PlayerStats({character}) {
    const [user, SetUser] = useContext(UserContext)
  return (
    <div>
        <h2>{user.username}</h2>
        <h3>HP: {character.hp}</h3>
        <h3>MP: {character.mp}</h3>
    </div>
  )
}
