import React, { Component, useState } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

export default function NavBar({path, changePath}){
  const [l, setL] = useState(null)
    return (
      <div >
        <ul style={{display:'flex',justifyContent:'space-evenly'}} onClick={(e)=> changePath(e.target.href)}>
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
