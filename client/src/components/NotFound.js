import React from 'react'

export default function NotFound({title ="How'd you get here? ", text="This page doesn't exist"}) {
  return (
    <div>
        <h1> {title} </h1>
        <h3>{text}</h3>
    </div>
  )
}
