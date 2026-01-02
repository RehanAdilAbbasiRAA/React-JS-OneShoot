// import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Dashboard from './components/Dashboard'
import Templates from './components/Templates'
import Settings from './components/Settings'
import Contact from './components/Contact'
import About from './components/About'
import LoginSignup from './components/LoginSignup'
import { Routes, Route } from "react-router-dom";
import ProjectForm from './components/ProjectForm'
import { Toaster } from 'react-hot-toast';// use For Toast to catch errro and Show at the Top

function App() {
  // const [count, setCount] = useState(0)


  return (
<div className="min-h-screen flex flex-col p-0">
     <Toaster position="top-right" />
      {/* Navbar at top */}
      <Navbar />

      {/* Main content area — grows to fill leftover space */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LoginSignup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/contact" element={<Contact />} /> 
          <Route path="/about" element={<About />} />
          <Route path="/project/new" element={<ProjectForm />} />
          <Route path="/project/edit/:id" element={<ProjectForm />} />
        </Routes>
      </main>

      {/* Footer pinned at bottom */}
      <Footer />
    </div>
  )
}

export default App
