import React, { Component, useState } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import './NavBar.css'
export default function NavBar({path, changePath}){
  const [l, setL] = useState(null)
    return (
      <div className='navbar' >
        <ul onClick={(e)=> changePath(e.target.href)}>
            <Link to='/games/category/action'>Action</Link>
            <Link to='/games/category/adventure'>Adventure</Link>
            <Link to='/games/category/puzzle'>Puzzle</Link>
            <Link to='/games/category/shooting'>Shooting</Link>
            <Link to='/games/category/strategy'>Strategy</Link>
            <Link to='/categories'>More</Link>
        </ul>
      </div>
    )

}
