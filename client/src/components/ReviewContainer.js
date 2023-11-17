import React from 'react'
import ReviewForm from './ReviewForm'
import Review from './Review'
import { useState, useEffect } from 'react'

export default function ReviewContainer({gameID, game}) {
    const [user, setUser] = useState(null)
    const[reviews, setReviews] = useState(game.reviews)
    console.log(reviews)
    useEffect(() => {
      fetch("/check_session").then((r) => {
        if (r.ok) {
          r.json().then((user) => setUser(user));
        }
      });
    }, []);

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

  return (
    <div className='reviewContainer'>
        ReviewContainer
        <ReviewForm handleSubmit={handleSubmit}/>
        {reviews?reviews.map((review)=><Review key={review.id} review={review}/>):null}
    </div>
  )
}
