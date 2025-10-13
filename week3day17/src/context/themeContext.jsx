import React,{ createContext, useContext, useEffect, useState } from 'react'

// 1️⃣ Create the context
const ThemeContext = createContext()

// 2️⃣ Create the provider Component
export function ThemeProvider({children}){

    const [theme,setTheme] = useState('light')
    const [name,setName]=useState('Rehan Adil RAA')


// 3️⃣ useEffect for localStorage persistence
    useEffect(() => {
        const savedtheme=localStorage.getItem("theme");
        if(savedtheme){
          setTheme(savedtheme)
        
      }
    }, [])

    // 4️⃣ On Every Change of Theme local storage is updated
      useEffect(() => {
        localStorage.setItem("theme", theme)
      }, [theme])
      
    // 4️⃣ Toggle function
      const toggleTheme = () => {
      setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };


      // 5️⃣ Return the context provider
    return (
      <ThemeContext.Provider value={{ theme, toggleTheme,name }}>
        {children}
      </ThemeContext.Provider>
    );


    
}

// 6️⃣ Custom hook (just to make it easy)
export function useTheme() {
  return useContext(ThemeContext);
}



