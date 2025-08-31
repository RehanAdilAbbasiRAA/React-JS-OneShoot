import { useState } from "react";

function Eventlistner(){
    const[name,setName]=useState("");
    const[password,setPassword]=useState("");

    const[submitName,getName]=useState("")
    const[submitPassword,getPassword]=useState("")


    const setvalues=(event)=>{
        event.preventDefault(); // stops page refresh
        if (name==="" || password===""){
          alert("Name and Password can not be Empty")
          return;
        }
        alert(`Hello ${name}   ${password}`)
        getName(name)
        getPassword(password)
        setName("");
        setPassword("");
    }
    return(
        <div style={{margin:"10px",padding:"10px"}}>

      <form onSubmit={setvalues}>
        <label htmlFor="name">Enter Name: </label>
        <input type="text" id="name" value={name} 
        onChange={(e) => setName(e.target.value)} 
         />
        <br /><br />

        <label htmlFor="pass">Enter Password: </label>
        <input type="password" id="pass" value={password} onChange={(e) => setPassword(e.target.value)}  />

        <br /><br />

        <button type="submit" > Login </button>
      </form>

      <h1> Name :{submitName}   Password :{submitPassword}</h1>
        </div>
    );
}
export default Eventlistner;

    //         {/* <form onSubmit={handleSubmit}>
    //             <label htmlFor="name"> Enter Name : </label>
    //             <input type="text" value={name} onChange={(e)=>setName(e.target.value)} />

    //             <label htmlFor="pass"> Enter Password : </label>
    //             <input type="text" value={password} onChange={(e)=>setPassword(e.target.value)} />
    //         </form> */}    
    //         const handleSubmit=(event)=>{
    //     event.preventDefault(); // Prevents page refresh
    // }