// // src/App3.jsx (your App3)
// import React from 'react'
// import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import Layout1 from './components/LayoutR'
// import Home from './components/homeR'
// import BookList from './components/BookList'
// import BookDetails from './components/BookDetails'
// import BookReviews from './components/BookReviews'
// import NotFound from './components/NotFound'

// export default function App3(){
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Layout1 />} >
//           {/* index = default child for "/" */}
//           <Route index element={<Home />} />

//           {/* sibling routes so list is replaced by detail */}
//           {/* <Route index element={<BookList />} /> */}
//           <Route path="books" element={<BookList />} />
//           <Route path="books/:id" element={<BookDetails />} />
//           <Route path="books/:id/reviews" element={<BookReviews />} />

//           {/* fallback */}
//           <Route path="*" element={<NotFound />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   )
// }




// FOR NESTED ROUTING WE USE THIS 

// import React from 'react'
// import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import Layout1 from './components/LayoutR'
// import Home from './components/homeR'
// import BookList from './components/BookList'
// import BookDetails from './components/BookDetails'
// import BookReviews from './components/BookReviews'
// import NotFound from './components/NotFound'

// export default function App3(){
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Layout1 />}>
//           <Route index element={<Home />} />

//           {/* parent route for all book-related pages */}
//           <Route path="books" element={<BookList />}>
//             {/* nested child: when a book is clicked, show details inside BookList */}
//             <Route path=":id" element={<BookDetails />} />
//             <Route path=":id/reviews" element={<BookReviews />} />
//           </Route>

//           <Route path="*" element={<NotFound />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   )
// }


// src/App3.jsx
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout1 from './components/LayoutR'
import Home from './components/homeR'
import BookList from './components/BookList'
import BookDetails from './components/BookDetails'
import BookReviews from './components/BookReviews'
import NotFound from './components/NotFound'

export default function App3() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout (Navbar + choose options) */}
        <Route path="/" element={<Layout1 />} />

        {/* Home and Books are siblings — each replaces previous */}
        <Route path="/home" element={<Home />} />
        <Route path="/books" element={<BookList />} />

        {/* Sub-pages for books */}
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/books/:id/reviews" element={<BookReviews />} />

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
