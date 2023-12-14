import React, { Fragment } from 'react'

export default function MessageLink({name,pfp,setChat}) {

    return (
    <Fragment>
    <div onClick={()=>setChat(name)} className='message-user'>
    <img src={pfp} style={{height:'50px', width:'50px', borderRadius:'50%'}}/>
    <p>{name}</p>
    </div>
    </Fragment>
  )
}
