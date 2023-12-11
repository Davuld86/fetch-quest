import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { check_session } from './helpers'

export default function Home() {
    const [user, setUser] = useState(null)
    useEffect(()=>{
        setUser(check_session)
    })

    return (

    <div>
        <NavBar user={user}/>
        <h1>Welcome to Fetch Quest</h1>
        <Link to='/play'><h1>Play Now</h1> </Link>
    </div>
  )
}
