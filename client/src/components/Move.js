import React from 'react'

export default function Move({move, handleMove}) {
  const costStyle ={
    marginBottom:'0px'
  }
  return (
    <div className='move' onClick={()=>handleMove(move)}>
        <h4>{move.name}</h4>
            <span style={{display:'flex', justifyContent:'space-evenly', alignItems:'center', marginBottom:'-10%', flexDirection:'column'}}>
            <h3 style={costStyle}>{move.cost > 0?`-${move.cost}`: `+${Math.abs(move.cost)}`} Mp</h3>
            <img src={`../images/${move.type}_icon.png`}/>
            </span>
        </div>
  )
}
