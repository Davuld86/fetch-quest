import React from 'react'

export default function Inbox({id,name, pfp, setBox}) {
  return (
    <div className='inbox' onClick={()=>setBox(id)}>
    <img src={pfp}/>
    <p>{name}</p>
    </div>
  )
}
