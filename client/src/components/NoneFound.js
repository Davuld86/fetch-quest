import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

import './None.css'

export default function NoneFound({title='No carrots in this patch!', image='../images/no_individual_category.png', text}) {
  return (
    <div className='none-page'>
        <h2 className='none-title'>{title}</h2>
        <img src={image} className='none-img'/>
        <h3 className='none-text'>{text}</h3>
        <Link to='/'><button>Back to Homepage</button></Link>
    </div>
  )
}
