
import React, { useState } from 'react';
function Counter() {
const [count, setCount] = useState(0); // declare state
const increment = () => setCount(count + 1); // update state
    return (
        <div style={{ border: '1px solid blue', padding: '10px', borderRadius:'8px', margin: "10px" }}>
        <h2>Counter: {count}</h2>
        <button onClick={increment}>Increment</button>
        </div>
        );
    }
export default Counter;