import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/login.css";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin= async (e)=>{
        e.preventDefault();
        try {
          const res = await axios.post("http://localhost:5000/login", { email, password }, {
                  withCredentials: true
                });
          localStorage.setItem("token", res.data.token);
          console.log("✅ navigate about to run"); 
          navigate("/ginniscart");
        } catch (err) {
          console.error("Login failed:", err.response?.data || err.message);
          alert("Invalid credentials");
        }
        
    }
  return (
    <div id="login-page">
      <form onSubmit={handleLogin} className="login-form">
        <h2 className="login-title">Login to Ginni's Cart</h2>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
          className="login-input"
        />
        <button type="submit" className="login-button">Login</button>
        <Navbar />
      </form>
    </div>
  )
}

export default Login