import React from 'react'
import LoggedInCont from './LoggedInCont'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

export default function NavBar({user}) {
  return (
    <div style={{display:'flex', justifyContent:'space-between'}}>
        <Link to='/'> <h4>Logo</h4> </Link>
        <h4>Register</h4>
        <h4>Logo</h4>
        <LoggedInCont/>

    </div>
  )
}
