import React, { useContext } from 'react'
import CharacterImage from './CharacterImage'
import { UserContext } from './App'

export default function EditCharacter() {
    const [user,setUser] = useContext(UserContext)
  return (
    <div>EditCharacter
        <div className='image'>
        <img src={`../images/overlays/overlay_${user.character[0].color}.png`} className='overlay' />
        <img src={`../images/raccoon.png`} className='raccoon'/>
        </div>
        <br/>
        <h2>Change Job:</h2>
        <div className='job-buttons'>
            <button> Theif</button>
            <button> Swordsman</button>
            <button> Wizard</button>
            <button> Archer</button>
        </div>
        <h3>You can change these later</h3>
    </div>
  )
}
