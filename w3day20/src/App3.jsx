import logo from './logo.svg';
import './App.css';
import { useState } from "react";

function App() {

 const [form, setForm] = useState({ name: "", email: "", pass: "" });
  const [errors, setErrors] = useState({});

  // 🔹 Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Validate before submit
  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    // if (!form.email.includes("@")) {
    //   newErrors.email = "Enter a valid email";
    // }
    if (!form.email.trim().toLowerCase().endsWith("@gmail.com")) {
      newErrors.email = "Enter a valid email";
    }

    if (form.pass.length < 6) {
      newErrors.pass = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // ✅ true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // stop reload

    if (validate()) {
      alert("✅ Form Submitted Successfully!");
      console.log("Form Data:", form);
      setForm({ name: "", email: "", pass: "" });
      setErrors({});
    }
  };

  return (
    <>

    <form onSubmit={handleSubmit} autoComplete="off">
      <h3>Signup Form</h3>
      <label htmlFor="name"> Name :</label>
      <input type="text"  name='name' value={form.name} onChange={handleChange}/>
        {errors.name && <p style={{ color: "red" }} >{errors.name}</p> }
      <label htmlFor="email" > Email :</label>
      <input type="email" name="email" value={form.email} onChange={handleChange}/>
        {errors.email && <p style={{ color: "red" }} >{errors.email}</p> }
      <label htmlFor="password"> Password :</label>
      <input type="password" name='pass' value={form.pass} onChange={handleChange} autoComplete="off"/>
        {errors.pass && <p style={{ color: "red" }} >{errors.pass}</p> }

              {/* ✅ ADD THIS */}
      <button type="submit">Submit</button>
    </form>
    </>
  );
}

export default App;
