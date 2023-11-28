import React, { Fragment } from 'react'
import UserReviewElement from './UserReviewElement'

export default function UserReviews({reviews, logged, handleDelete}) {
  return (
    <div className='userReviews'>
    {reviews.map((review)=>
        <UserReviewElement key={review.id} review={review} logged={logged} handleDelete={handleDelete}/>)
    }
    </div>
  )

}
