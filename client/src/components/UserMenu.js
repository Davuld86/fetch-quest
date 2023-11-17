import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

export default function UserMenu({user, toggleMenu}) {
  return (
    <div style={{display:'table'} }>
        <Link to={`/user/${user.id}`} onClick={()=>toggleMenu(false)}><p>view profile</p></Link>
        <p>Account settings</p>
        <p>something</p>
        <p>log out</p>
    </div>
  )
}
