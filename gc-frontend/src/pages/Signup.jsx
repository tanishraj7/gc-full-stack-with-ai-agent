import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/signup.css";
import Navbar from "../components/Navbar";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup= async (e)=>{
        e.preventDefault()
        await axios.post("http://127.0.0.1:5000/signup", {email, password});
        alert("Sign-up successful please Login again ✅")
        navigate("/");
    }

    return (
        <div id="signup-page">
        <form onSubmit={handleSignup} className="signup-form">
            <h2 className="signup-title">Signup to Ginni's Cart</h2>
            <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
                className="signup-input"
            />
            <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
                className="signup-input"
            />
            <button type="submit" className="signup-button">Signup</button>
            <Navbar />
        </form>
        </div>
    );
}

export default Signup