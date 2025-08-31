
import React ,{useState} from "react";
function StateDemo(){
        const [counter,counterFun]=useState(0);
        const updateCounter=()=>counterFun(counter+1);
        const updateCounter2=()=>counterFun(counter-1);

        const [onButton,buttonCheck]=useState(false);
        const buttonCheck1=()=>buttonCheck(!onButton);

        //for input name logic 
        const[name,setName]=useState("");
        const[subName,displayName]=useState("");
        const handleClick=()=>{
            displayName(name);
            setName("");
            };

        // for input Fruit logic
        const [fruit,setFruit]=useState("");
        const [subfruit,disFruit]=useState([]);
        const addFruit=()=>{
            disFruit([...subfruit,fruit]);
            setFruit("")};


    return(
        <div style={{padding:"10px",margin:"10px", border:"10px solid green"}}>
            <div>
                            <h3> <button style={{padding:"10px",margin:"10px", border:"1px solid green"}} onClick={updateCounter2}>Decrement</button>   <b style={{padding:"10px",margin:"5px", border:"1px solid green", fontSize:"30px"}}>{counter}</b> <button style={{padding:"10px",margin:"10px", border:"1px solid green"}} onClick={updateCounter}>Increment</button>   </h3>
            </div>

            <div>
                <h2><button onClick={buttonCheck1}> {onButton?"On 🔛":"Off 📴"}</button></h2>
            </div>

            <div>
                <label htmlFor="Name">Enter your name : </label>
                
                <input type="text"  value={name} onChange={(e)=>{setName(e.target.value)}}/>
                <br />
                <button onClick={handleClick}>Submit</button>

                <b>Your name is {subName}!</b>
            </div>

            {/* list of items */}
            <div>
                <label htmlFor="Fruits"> Enter the Fruits one by one</label>
                <input type="text" value={fruit}  onChange={(e)=>{setFruit(e.target.value)}}/>
                <br />
                    <button onClick={addFruit}>Submit</button>

                    <b>Fruits are {subfruit.join(", ")}!</b>
                    <h2>
                        {subfruit.map((i,index)=>
                        ( <li key={index}> {i}</li> )
                        )}
                    </h2>
            </div>

            
        </div>

    );
    }
export default StateDemo;