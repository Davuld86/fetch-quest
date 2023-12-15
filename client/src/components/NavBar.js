import React, { useContext } from 'react'
import LoggedInCont from './LoggedInCont'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import {UserContext } from './App'


export default function NavBar() {
  const [user, setUser] = useContext(UserContext)

  return (
    <div style={{display:'flex', justifyContent:'space-between'}}>
        <Link to='/'> <h4>Logo</h4> </Link>
        {user?<Link to='/'><h4>Edit Character</h4></Link>:<Link to='/register'><h4>Register</h4></Link>}
        <LoggedInCont/>
    </div>
  )
}
