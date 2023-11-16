import React, { Fragment, useState } from 'react'
import UserMenu from './UserMenu'

export default function LoggedUser({user}) {
  const [menuActive, toggleMenu] = useState()
    return (
    <Fragment>
    <div style={{display:'flex', justifyContent: 'flex-end', alignContent: 'center'}}>
        <h4 title='upload game'>🔼</h4>
        <h4 title='View Favorites'>❤️</h4>
        <img onClick={()=>toggleMenu((pos)=>(!pos))} src={user.pfp} style= {{maxWidth:'50px', height:'50px', borderRadius:'50%', objectFit:'cover'}}></img>
    </div>
    { !menuActive? null: <UserMenu/>}
    </Fragment>
  )
}
