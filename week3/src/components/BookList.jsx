
// src/components/BookList.jsx
import { Link, Outlet} from 'react-router-dom'
const BookList = () => {
    const books = [
    { id: 1, title: 'React for Humans', description: 'A practical React guide.' },
    { id: 2, title: 'JS Patterns', description: 'Common JS patterns.' },
    { id: 3, title: 'CSS Mastery', description: 'Layout, Grid, Flexbox.' },
    { id: 4, title: 'Node in Action', description: 'Server-side JS.' }
    ]
  return (
    <div>
        <h2>Books</h2>
        <ul>
            {books.map(b => (
            <li key={b.id}>
                {/* navigate to /books/ID ; pass the book as state (optional) */}
                <Link to={`/books/${b.id}`} state={b}>{b.title}</Link>
            </li>
            ))}
        </ul>
                    {/* 👇 This is where BookDetails or BookReviews will appear */}
      <Outlet />
        </div>
  )
}

export default BookList