// src/components/BookReviews.jsx
import { useParams, useLocation } from 'react-router-dom'
export default function BookReviews(){
  const { id } = useParams();
  const location = useLocation();
  const book = location.state; // ok if Link passed state
  return (
    <div>
      <h3>Reviews for book {book?.title ?? id}</h3>
      <ul>
        <li>Great read.</li>
        <li>Learned something new.</li>
      </ul>
      <p><em>Note:</em> if you refresh and `location.state` is empty, you should load the book by id.</p>
    </div>
  )
}

