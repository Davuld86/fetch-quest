import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

export default function CategoryBar({categories}) {
  return (
    <span style={{display:'flex'}}>
        {categories.map((category)=><Link to={`/games/category/${category.name}`} key={category.id}><button>{category.name}</button></Link>)}
    </span>
  )
}
