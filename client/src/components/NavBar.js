import React, { Fragment, useContext } from 'react'
import LoggedInCont from './LoggedInCont'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import {UserContext } from './App'

import './NavBar.css'
export default function NavBar() {
  const [user, setUser] = useContext(UserContext)

  return (
    <div style={{display:'flex', justifyContent:'space-'}} className='nav-bar'>

        <Link to='/'> <img src={'../images/logo.png'}/> </Link>
        {user?
        <Fragment>
        <Link to='/play'> <h4>Play</h4> </Link>
        <Link to='/store'> <h4>Shop</h4> </Link>
        </Fragment>
        :null}
        {user?<Link to={`/edit-character/${user.id}`}><h4>Edit Character</h4></Link>:<Link to='/register'><h4>Register</h4></Link>}
        <LoggedInCont/>
    </div>
  )
}
