
// src/components/BookDetails.jsx
import { useParams, useLocation, Link,Outlet  } from 'react-router-dom'
const books = [
  { id: 1, title: 'React for Humans', description: 'A practical React guide.' },
  { id: 2, title: 'JS Patterns', description: 'Common JS patterns.' },
  { id: 3, title: 'CSS Mastery', description: 'Layout, Grid, Flexbox.' },
  { id: 4, title: 'Node in Action', description: 'Server-side JS.' }
]
export default function BookDetails(){
  const { id } = useParams();                     // read :id
  const location = useLocation();                // read state passed by Link
  const bookFromState = location.state;
  const book = bookFromState ?? books.find(b => b.id === Number(id)); // fallback for refresh

  if(!book) return <div>Book not found</div>;

  return (
    <div>
      <h2>{book.title}</h2>
      <p>{book.description}</p>

      <p>
        <Link to={`/books/${id}/reviews`} state={book}>Reviews</Link>
        {" | "}
        <Link to="/books">Back to list</Link>
      </p>

    </div>
  )
}
