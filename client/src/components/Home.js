import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'


export default function Home() {


    return (
    <div>

        <h1>Welcome to Fetch Quest</h1>
        <Link to='/play'><h1>Play Now</h1> </Link>
    </div>
  )
}
