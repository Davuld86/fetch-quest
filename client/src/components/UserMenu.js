import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

export default function UserMenu({user, toggleMenu, handleLogOut}) {
  return (
    <div style={{display:'table'} } className='user-menu'>
        <Link to={`/user-account/${user.id}`} onClick={()=>toggleMenu(false)}><p>Profile</p></Link>
        <button onClick={()=>{toggleMenu(false); handleLogOut()}}>log out</button>
    </div>
  )
}
