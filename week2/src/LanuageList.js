
function LanuageList(){
    const lanuages=["java","python","C++","C","GO"]
    const students = [
                    { id: 1, name: "Ali" },
                    { id: 5, name: "Sara" },
                    { id: 3, name: "Ahmed" }
                    ];


    return(
        <div>
        <h2>
            <ol style={{display: "table", border:"2px solid black" ,margin:"5px"}}>
                {lanuages.map((lanuage,index)=>(
                    <li style={{padding:"10px"}} key={index} > {lanuage} </li>
                ))}
            </ol>
            <ol style={{display: "table", border:"2px solid black" ,margin:"5px"}}>
                {students.map((student)=>(
                    <li style={{padding:"10px"}} key={student.id} > {student.name}</li>
                ))}
            </ol>
        </h2>
        </div>
    );}
export default LanuageList;