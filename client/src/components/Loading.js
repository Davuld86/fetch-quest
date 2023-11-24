import React from 'react'

export default function Loading({image= '../images/loading.gif'}) {
  return (
    <div>
    <h1>Loading...</h1>
    <img src={image}/>
    <p>Hang on just a sec...</p>
    </div>
  )
}
