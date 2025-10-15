// import logo from './logo.svg';
// import './App.css';
// import useLocal from './CustomHooks/uselocal';

// function App() {
//   const [name,setName]=useLocal("")
//   return (
//     <div className="App">

//   <input value={name} onChange={(e) => setName(e.target.value)} />
//   <p>Stored Name: {name}</p>
//     </div>
//   );
// }

// export default App;



import logo from './logo.svg';
import './App.css';
import useLocal from './CustomHooks/uselocal';
import { useState } from 'react';

function App() {
  const [name,setName]=useLocal("")
  const [temp,setTemp]=useState(name)
  const handleSubmition=(e)=>{
    e.preventDefault()
    setName(temp)
    setTemp(""); // clears input
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmition}>

  <input value={temp} onChange={(e) => setTemp(e.target.value)} />
      </form>
  <p>Stored Name: {name}</p>
    </div>
  );
}

export default App;
