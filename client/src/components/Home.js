import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { check_session } from './helpers'

export default function Home() {
    const [user, setUser] = useState(null)
    useEffect(()=>{
        fetch("/api/check_session").then((r) => {
            if (r.ok) {
              r.json().then((user) => {setUser(user)});
            }
            else{
                return (null)
            }
          })

    },[])

    return (
    <div>
        <NavBar user={user} setUser={setUser}/>
        <h1>Welcome to Fetch Quest</h1>
        <Link to='/play'><h1>Play Now</h1> </Link>
    </div>
  )
}
