import React, { useEffect, useState } from 'react'
import Loading from './Loading'
import NoneFound from './NoneFound'
import UserReviews from './UserReviews'

export default function UserReviewsPage() {
  const userID = window.location.pathname.slice(14)
  const [isLoading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [reviews, setReviews] = useState(null)
  const [logged, setLogged ] = useState(null)

  useEffect(() => {
    fetch("/check_session").then((r) => {
     if (r.ok) {
       r.json().then((log) => setLogged(log));
     }
     else{
         setLogged(0)
     }
   }).then( ()=> {
   fetch(`/user/${userID}`).then((r) => {
     if (r.ok) {
       r.json().then((user) => {setUser(user);setReviews(user.reviews?user.reviews:0)});
     }
     else{
      setUser(0)
     }
 })
 setLoading(false)
})
   }, []);

  function handleDelete(review){
    fetch(`/review/${review.id}`, {
        method: 'DELETE'
    }).then(setReviews((reviews)=> reviews.filter((rev)=>rev.id!=review.id)))

}

  if(isLoading){
    return <Loading/>
  }
  else if(user && logged){
    if(user==0){
      return <NoneFound text={'This user does not exist'}/>
    }
    if(reviews==0){
      return <NoneFound title='No reviews here' image={'../images/games_missing.png'} text={'This user does not have any reviews'}/>
    }
    else{
    return (
    <div>
      <h1>Reviews by: {user.username}</h1>
      <UserReviews reviews={reviews} logged={logged.id} handleDelete={handleDelete}/>
    </div>

  )
  }

}
}
