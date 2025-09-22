

// function CustomButton(props){


//     return(
//         <div>
//             <div style={{ display: "flex", alignItems: "center", alignContent: "stretch", justifyContent: "center"}} >
//             <button style={{padding:"10px",margin:"10px",fontSize:"30px"}} onClick={props.decrement}> <b>{props.name1} </b> </button>
//             <h1 style={{padding:"10px",margin:"10px",fontSize:"70px" }} >{props.count}</h1>
//             <button style={{padding:"10px",margin:"10px",fontSize:"30px"}} onClick={props.increment}> <b>{props.name2} </b> </button>
//             </div>

//             <div style={{    display: "flex",justifyContent: "center"}}>
//                 <button style={{padding:"10px",margin:"10px",fontSize:"30px" }} onClick={props.reset}> <b>{props.name3} </b> </button>
//             </div>
//         </div>
//     );}

// export default CustomButton;

// CounterButton.js
function CustomButton({ label, onClick }) {
  return (
    <button 
      style={{ padding: "10px", margin: "10px", fontSize: "30px" }}
      onClick={onClick}
    >
      <b>{label}</b>
    </button>
  );
}

export default CustomButton;
