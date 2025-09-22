import { useState } from "react"

function AuthPanel(){

    const[isLoggedIn,setisLoggedIn]=useState(false);
    function clock(){
        const now = new Date();
        const hour = now.getHours(); // 0–23
        return hour
    }

    function changestate(){
        setisLoggedIn(!isLoggedIn)
    }

    function rendercheck(){

            if (isLoggedIn===false){
                return( <h2><button onClick={changestate} >Login</button></h2> )
            }
            else{
                return( <h2>
                            <h1> Welcome, User!”  {clock()<=12? <h2>Good Morning </h2> : <h2>Good Evening </h2>  }</h1>
                            
                            <button onClick={changestate} >Logout </button>
                        </h2> )
            }

    }

    return(

            <div>
                    <p> {rendercheck()}</p>
            </div>


            );
            }

export default AuthPanel;