import React from 'react'
import ReviewForm from './ReviewForm'
import Review from './Review'
import { useState, useEffect } from 'react'

export default function ReviewContainer({reviews, user, handleSubmit, handleDelete}) {


if (reviews&&user){
let checkReview = reviews.filter((rev)=> rev.user_id ==user.id)[0]
  return(
    <div className='reviewContainer'>
        {checkReview?null:<ReviewForm handleSubmit={handleSubmit}/>}
        <h3>{reviews.length} Review{reviews.length==1?'':'s'}:</h3>
        {reviews&&user?reviews.map((review)=><Review handleDelete={handleDelete} userID={user.id} key={review.id} review={review}/>):null}
    </div>
  )
}
else{
    return(
    <div>
    <h3>Create an account to review this game</h3>
    {reviews?reviews.map((review)=><Review handleDelete={handleDelete} userID={0} key={review.id} review={review}/>):null}
    </div>
    )
}
}
