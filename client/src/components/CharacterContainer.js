import React from 'react'
import CharacterImage from './CharacterImage'

export default function CharacterContainer({character}) {
  return (
    <div className='character-container'>
      <div className='character-stats'>
      <h3>Job: {character.job[0].toUpperCase()+character.job.slice(1)}</h3>
      <h3>Level: {character.level}</h3>
      <h3>HP: {character.hp} / {character.max_hp}</h3>
      <h3>MP: {character.mp} / {character.max_mp}</h3>
      <h3>Exp: {character.exp}</h3>
      <h3>Attack: {character.atk}</h3>
      <h3>Magic Atk: {character.matk}</h3>
      <h3>Defense: {character.defense}</h3>
      </div>
     <CharacterImage color={character.color} job={character.job}/>
    </div>
  )
}
