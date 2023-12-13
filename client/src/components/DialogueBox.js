import React from 'react'
import './DialogueBox.css'

export default function DialogueBox({title, text, onYes, onNo}) {
  return (
    <div className='dialogue-box'>
        <h2>{title}</h2>
        <p>{text}</p>
        <button onClick={onYes}>Yes </button>
        <button onClick={onNo}>No </button>
    </div>
  )
}
