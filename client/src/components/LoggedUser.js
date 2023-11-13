import React, { Fragment, useState } from 'react'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'

export default function LoggedUser({user}) {
  const [menuActive, toggleMenu] = useState(false)
    return (
    <Fragment>
    <Fragment style={{display:'flex', justifyContent: 'flex-end', alignContent: 'center'}}>
        <h4 title='upload game'>🔼</h4>
        <h4 title='View Favorites'>❤️</h4>
        <img onClick={()=>toggleMenu((pos)=>(!pos))} src={user.pfp} style= {{width:'8%', borderRadius:'50%', objectFit:'cover'}}></img>
    </Fragment>
    <ul hidden={!menuActive}>
        <li>view profile</li>
        <li>Account settings</li>
        <li>something</li>
        <li>log out</li>
    </ul>
    </Fragment>
  )
}
