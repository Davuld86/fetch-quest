import React, { useContext, useEffect, useState } from 'react'
import NavBar from './NavBar'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

import './Home.css'
import { UserContext } from './App'
export default function Home() {
const [user, setUser]=  useContext(UserContext)

    return (
    <div className='home-page'>

        <h1>Welcome to Ringtail Realm!</h1>
        <Link to={user?'/game':'/register'}> <img className='play-button' src='../images/play_button.png'/> </Link>
        <img className='banner' src='../images/banner_image.png'/>

    </div>
  )
}
