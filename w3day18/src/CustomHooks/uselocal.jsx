import React,{useEffect, useState} from 'react'



const useLocal = (name2) => {
    const [name, setName] = useState(()=>{
        const savedName = localStorage.getItem('name');
        return savedName || "";

    });

    // this effect will run when the name changes
    useEffect(() => {
        localStorage.setItem('name', name);
    }, [name]);

    // // this effect will run when the component mounts
    // useEffect(() => {
    //     const savedName = localStorage.getItem('name');
    //     if (savedName) {
    //         setName(savedName);
    //     }
    // }, [])
    
    return [name,setName]
    }

export default useLocal