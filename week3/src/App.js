import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import App2 from './components/Day15Routing';
import App3 from './components/Day15Ex';


function App() {
  return (
    <div className="App">
      <App2/>
      <App3/>
    </div>
  );
}

export default App;
