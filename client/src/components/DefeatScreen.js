import React from 'react'

export default function DefeatScreen({exitBattle, setCharacter, character}) {
  function handleExit(){
    exitBattle()
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
