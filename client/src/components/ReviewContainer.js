import React from 'react'
import ReviewForm from './ReviewForm'
import Review from './Review'
import { useState, useEffect } from 'react'

export default function ReviewContainer({gameID, game, user}) {
    const[reviews, setReviews] = useState(game.reviews)

    function handleSubmit(review){
      let temp =  {
            'score' : parseInt(review.score),
            'comment': review.comment,
            'user_id' : user.id,
        }

        fetch(`/game/${gameID}/`,{
            method:'POST',
            headers:{
                'Content-Type': "application/json"
            },
            body: JSON.stringify(temp)
        }
        )
        .then((r)=> {
            if(r.ok){
                r.json().then((d)=> setReviews([d,...reviews]))
            }
            else{
             r.json().then((d)=> alert(d.error))
            }
          })
    }

    function handleDelete(review){
        fetch(`/review/${review.id}`, {
            method: 'DELETE'
        }).then(setReviews((reviews)=> reviews.filter((rev)=>rev.id!=review.id)))

    }
if (reviews&&user){
let checkReview = reviews.filter((rev)=> rev.user_id ==user.id)[0]
  return(
    <div className='reviewContainer'>
        ReviewContainer
        {checkReview?null:<ReviewForm handleSubmit={handleSubmit}/>}
        <h3>{reviews.length} Review{reviews.length>1?'s':''}</h3>
        {reviews&&user?reviews.map((review)=><Review handleDelete={handleDelete} userID={user.id} key={review.id} review={review}/>):null}
    </div>
  )
}
else{
    return(
    <div>
    <h3>Create an account to review this game</h3>
    {reviews.map((review)=><Review handleDelete={handleDelete} userID={0} key={review.id} review={review}/>)}
    </div>
    )
}
}
