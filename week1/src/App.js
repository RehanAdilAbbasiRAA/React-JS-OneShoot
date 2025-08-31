import logo from './logo.svg';
import './App.css';
import Header from './Header';
import JSXBasics from './JSXBasics';
import ProfileCard from './ProfileCard';
import ProductCards from './ProductCards';
import Pro from './Pro';
import Counter from './CounterHook';
import ToggleButton from './ToogleHooks';
import StateDemo from './Statedemo';
import Eventlistner from './Eventlistner';
import CustomButton from './CustomButton';
import { useState } from "react";


function App({initialValue = 0}) {

    const [count, setCount] = useState(initialValue);
    const [count2, setCount2] = useState(0);
    const bigIncrease=()=>{
        setCount(prev=> prev+5)
    }
    const increment = () => setCount(prev=>prev + 1);
    const decrement = () => 
        {
            if (count<=0){
                alert(`the Count is Going below ${count} counter2 ${count2}`)
                setCount2(count2+1)
            }
            else if (count2!==0){
                alert(`the one time warning complete${count2}`)
                setCount2(count2+1)
            }

            setCount(prev=>prev - 1)};
    const reset = () => setCount(initialValue);
    // const[defaultcount,setDefault]=useState(10);
    // const[count,setCount]=useState(0);
    //     setCount(defaultcount)
    // const increment=()=>{
    //     setCount(count+1)
    // };
    // const decrement=()=>{
    //     setCount(count-1)
    // };
    // const reset=()=>{
    //     setCount(0)
    // };

return (
<div>
  <Header />
<h1>Hello React.js 🚀</h1>
{/* Week 2 task */}
<JSXBasics/>
{/* Week 3 tasks */}
<ProfileCard name="Rehan" age={21} bio="Islamabad " isStudent={false} />
<ProfileCard name="Boss" age={25} bio="Software Engineer " isStudent={true} />
<ProfileCard />

{/* Week 4 tasks */}
<ProductCards title="Red Fresh Grapes 🍇" price={0} inStock={true} tags="#Red #Fresh"/>
<ProductCards title="Red Fresh Grapes 🍇" price="20" inStock="yes" tags="#Red #Fresh"/>
<ProductCards title="Red Apple" />
<ProductCards />
<ProductCards title={123} price="free" inStock="maybe" tags={99} />

<Pro title={123} price="free" inStock="maybe" tags={99} />

{/* day 5 tasks */}
<Counter/>
<ToggleButton/>
<StateDemo/>

{/* Day 6 Tasks */}
<Eventlistner/>

{/* Day 7 Task */}
{/* <CustomButton increment={increment} decrement={decrement} reset={reset} name1="Decrement" name2="Increment" name3="Reset"  count={count}/> */}
    <div style={{ textAlign: "center" }}>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <CustomButton label="Decrement" onClick={decrement} />
        <h1 style={{ margin: "20px", fontSize: "70px" }}>{count}</h1>
        <CustomButton label="Increment" onClick={increment} />
      </div>

      <CustomButton label="Reset" onClick={reset} />
      <CustomButton label="Bigger Jump (+5)" onClick={bigIncrease} />
    </div>

</div>
);
}


export default App;
