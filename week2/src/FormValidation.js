
import { useState } from "react"

// function ValidatedForm() {
//         const [email, setEmail] = useState("");
//         const [error, setError] = useState("");
//         const handleChange = (e) => {
//         const value = e.target.value;
//         setEmail(value);
//         setError(value.includes("@") ? "" : "Invalid email format");
//         };
//         const handleSubmit = (e) => {
//         e.preventDefault();
//         if (!error && email) alert(`Submitted: ${email}`);
//         };

//     return (
//         <form onSubmit={handleSubmit}>
//         <label>Email:</label>
//         <input type="text" value={email} onChange={handleChange} />
//         {error && <p style={{ color: "red" }}>{error}</p>}
//         <br />
//         <button type="submit" disabled={!!error || !email}>
//         Submit
//         </button>
//         </form>
//         );
//     }

function ValidatedForm(){

    const [form,setform]=useState({name:"",email:"",password:"",gender:"",bio:"",role:""});
    const submitForm=(e)=>{
      e.preventDefault(); // stop page refresh
      console.log(form);
      setform({ name: "", email: "", password: "", gender: "", bio: "", role: "" });
      setIsValid(false);
      alert("Form submitted successfully!");
    }
    const [isValid, setIsValid] = useState(false);
    const setValue=(key,value)=>{
          const updatedForm = { ...form, [key]: value }; // new form values
          setform(updatedForm);
          // setform({...form,[key]:value});
              // simple validation
              if (
                updatedForm.name.trim() !== "" &&
                updatedForm.email.includes("@") &&
                updatedForm.password.length >= 6
              ) {
                setIsValid(true);
              } else {
                setIsValid(false);
              }
          }

    return(
      <div>
        <form onSubmit={submitForm}>
            <label htmlFor="Name" >Name :</label>
            <input type="text" value={form.name}  onChange={(e)=>setValue("name",e.target.value)} />
            <label htmlFor="Email">Email :</label>
            <input type="email" name="Email" id="email" value={form.email} onChange={(e)=>setValue("email",e.target.value)} />
            <label htmlFor="Password">Password :</label>
            <input type="text" value={form.password} onChange={(e)=>setValue("password",e.target.value)} />
            <label htmlFor="Gender">Gender : </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={form.gender === "male"} 
                    onChange={(e)=>setValue("gender",e.target.value)}
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={form.gender === "female"}
                    onChange={(e)=>setValue("gender",e.target.value)}
                  />
                  Female
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="other"
                    checked={form.gender === "other"}
                    onChange={(e)=>setValue("gender",e.target.value)}
                  />
                  Other
                </label>

            <label htmlFor="BIo">  Bio :</label>
            <textarea name="bio" id="bio" value={form.bio} onChange={(e)=>setValue("bio",e.target.value)}></textarea>
            <label htmlFor="Role">Role :</label>
                    <select name="role" id="role" value={form.role} onChange={(e)=>setValue("role",e.target.value)}>
                        <option value="">--Select--</option> 
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        <option value="guest">Guest</option>
                    </select>
                    <button disabled={ !isValid }> Submit  </button>
        </form>

        <div style={{padding:"20px",margin:"10px",fontSize:"25px",fontWeight:"bold",border:"2px solid black"}}>
            <h3>Form Data</h3>
            <p>Name : {form.name}</p>
            <p>Email : {form.email}</p>
            <p>Password : {form.password}</p>
            <p>Bio :{form.bio}</p>
            <p>Gender :{form.gender}</p>
            <p>Role :{form.role}</p>
        </div>
      </div>  
    );}
export default ValidatedForm;
