

import { BrowserRouter, Routes, Route, Link,useNavigate,NavLink } from "react-router-dom";

function AbbasiHome(params) {
    const navigate = useNavigate();  // hook to navigate programmatically
    return(
        <div>

        <h1> We are At Rehan Abbasi's Home  🏡</h1>
        <button onClick={()=>navigate("/services")}> Go to Services </button>
        </div>
    )
    
};
function AbbasiConact(params) {
    return(
            <h1>We are Contacting Rehan Abbasi 📞</h1>
    )
    
};
function AbbasiAbout(params) {
    return(
        <h1> we are at About Rehan 🆎</h1>
    )
    
};

function AbbasiServices() {
  return (
    <h1> We are at Rehan Abbasi's Services 💼</h1>
  );
}
function App3(params) {
    return(

            <BrowserRouter>
            <nav style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
            </nav>

                <Routes>
                    <Route path="/" element={<AbbasiHome/>}/>
                    <Route path="/about" element={<AbbasiAbout/>}/>
                    <Route path="/contact" element={<AbbasiConact/>}/>
                    <Route path="/services" element={<AbbasiServices/>}/>

                </Routes>

            </BrowserRouter>
    )
    

};
export default App3;