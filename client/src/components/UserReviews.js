import React, { Fragment } from 'react'
import UserReviewElement from './UserReviewElement'

export default function UserReviews({reviews}) {
  return (
    <div className='userReviews'>
    {reviews.map((review)=>
        <UserReviewElement key={review.id} review={review}/>)
    }
    </div>
  )

}
