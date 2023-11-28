import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

export default function CategoryLink({category}) {
if (category.games.length ==0){
    return null
}
else{
  return (
    <li>
    <span style={{display:'flex'}}>
        <Link to={`/games/category/${category.name}`}>
        <p>{category.name} </p>
        </Link>
        <p title={`${category.games.length}. games with this category`}>{category.games.length}</p>
    </span>
     </li>
  )
}
}
