import React, {Fragment} from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

export default function UserReviewElement({review}) {
  return (
    <Fragment>
    <h4>{review.reviewed.title}</h4>
    <Link to={review.reviewed.path}><img src={review.reviewed.thumbnail}/></Link>
    <h3>{'⭐'.repeat(review.game_score)}</h3>
    <p>{review.comment}</p>
    <p>{review.comment_score}</p>

    </Fragment>
  )
}
