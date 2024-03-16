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
        <Link to='/game'> <h4>Play Game</h4> </Link>
        <Link to='/store'> <h4>Bandit's Bazaar </h4> </Link>
        </Fragment>
        :null}
        {<Link to={user? `/edit-character/${user.id}`:'/register'}><h4>{user?'Edit Character':'Register'}</h4></Link>}
        <LoggedInCont/>
    </div>
  )
}
