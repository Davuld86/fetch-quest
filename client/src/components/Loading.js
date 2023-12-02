import React from 'react'
import './Loading.css'
export default function Loading({image= `../images/loading${Math.floor(Math.random() * 3)+1}.gif`}) {
  return (
    <div className='loading'>
    <h1>Loading...</h1>
    <img src={image}/>
    <p>Hang on just a sec...</p>
    </div>
  )
}
