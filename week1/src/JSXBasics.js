// src/JSXBasics.js
import React from 'react';
import logo from './logo.svg'; // or use public assets
import './JSXBasics.css';
import Weekends from './Weekend';

function JSXBasics() {
const name = 'Rehan';
const user = { firstName: 'Rehan', lastName: 'Abbasi' };
const now = new Date();
const numbers = [2, 1, 3, 4];
// with list date 
const weekends = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const today = new Date();
const currentDay = weekends[today.getDay()]; // getDay() gives 0 (Sunday) → 6 (Saturday)
console.log(typeof currentDay,today,today.getDay())

function formatName(u) {
return u.firstName + ' ' + u.lastName;
}


const boxStyle = { padding: '12px', borderRadius: '8px', backgroundColor: '#f9fafb' };


const exampleElement = <em>JSX can even be stored in variables.</em>;


return (
<>
<div className="card" style={boxStyle}>
<img src={logo} alt="logo" width="48" />
<h2>Hello, {formatName(user)}!</h2>
<p>{exampleElement}</p>
<p>Today is {now.toLocaleDateString()}</p>
<p>Math in JSX: 2 + 3 = {2 + 3}</p>


<p>
Numbers: {numbers.map(n => <span key={n}>{n} </span>)}
</p>

<h2>
  {currentDay===0 || currentDay===1? <p>Today is Weekday</p> : <p>Today is working day</p> }
</h2>
<h3>    Today :{today.toLocaleDateString()}    day:{currentDay}</h3>

<Weekends/>

{/* This is a JSX comment. */}
<label htmlFor="nameInput">Your name:</label>
<input id="nameInput" defaultValue={name} />
</div>


<div style={{ marginTop: '12px' }}>
{/* small example of raw HTML insertion (only if necessary) */}
<div dangerouslySetInnerHTML={{ __html: '<strong>Raw HTML example </strong>' }} />
</div>
</>
);
}


export default JSXBasics;