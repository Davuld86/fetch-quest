import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

export default function UserMenu({user, toggleMenu, handleLogOut}) {
  return (
    <div style={{display:'table'} }>
        <Link to={`/user/${user.id}`} onClick={()=>toggleMenu(false)}><p>view profile</p></Link>
        <p>Account settings</p>
        <p>something</p>
        <button onClick={()=>{toggleMenu(false); handleLogOut()}}>log out</button>
    </div>
  )
}
