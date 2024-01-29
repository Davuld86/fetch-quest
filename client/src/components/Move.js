import React from 'react'

export default function Move({move, handleMove}) {
  return (
    <div className='move' onClick={()=>handleMove(move)}>
        <h4>{move.name}</h4>
            <span style={{display:'flex', justifyContent:'space-evenly', alignItems:'center'}}>
            <img src={`../images/${move.type}_icon.png`}/>
            {move.cost >0?<h3>{move.cost} Mp</h3>:null}
            </span>

        </div>
  )
}
