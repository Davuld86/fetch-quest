import React from 'react'

export default function DialogueBox({text, text2,handleYes, handleNo}) {
  return (
    <div style={{ display:'grid',justifyItems:'center', position:'absolute',backgroundColor:'gray', left:'50%', top:'50%'}}>
        <h2>{text}</h2>
        {text2?<p>{text2}</p>:null}
        <button onClick={()=>handleYes()}>Yes</button>
        <button onClick={()=>handleNo()}>No</button>
    </div>
  )
}
