import React, { useContext } from 'react'
import { UserContext } from './App'

export default function DefeatScreen({exitBattle, setCharacter, character}) {
  const [user, setUser]= useContext(UserContext)
  function handleExit(){
    exitBattle(character, user)
    setCharacter({...character, hp:character.max_hp})
}

return (
<div className='defeat'>
    <h1>You were defeated</h1>
    <div style={{display:'flex'}}>
    </div>
    <button onClick={handleExit}>Exit</button>
</div>
)
}
