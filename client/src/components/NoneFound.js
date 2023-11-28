import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

export default function NoneFound({title='No carrots in this patch!', image='../images/no_individual_category.png', text}) {
  return (
    <div>
        <h2>{title}</h2>
        <img src={image}/>
        <h3>{text}</h3>
        <Link to='/'><button>Back to Homepage</button></Link>
    </div>
  )
}
