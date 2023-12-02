import React from 'react'
import './DialogueBox.css'
export default function DialogueBox({text, text2,handleYes, handleNo}) {
  return (
    <div className='dialogue-box'>
        <h2>{text}</h2>
        {text2?<p>{text2}</p>:null}
        <button onClick={()=>handleYes()}>Yes</button>
        <button onClick={()=>handleNo()}>No</button>
    </div>
  )
}
