
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";


function Home() {
  return <h2>🏠 Welcome to Home Page</h2>;
}
function About() {
  return <h2>ℹ️ About Us</h2>;
}
function Contact() {
  return <h2>📞 Contact Page</h2>;
}

function App2() {
  return (
    <div>

<BrowserRouter>
      <nav style={{display:"flex", gap:"10px", margin:"10px"}}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>

    </div>
  );
}

export default App2;