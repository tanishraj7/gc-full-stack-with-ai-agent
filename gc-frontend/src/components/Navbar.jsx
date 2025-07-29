// components/Navbar.js
import { Link } from "react-router-dom";
import "../styles/navbar.css";

export default function Navbar() {
  return (
    <div id="auth-page">
    <nav className="auth-navbar">
      <p className="subtitle">Welcome to GINNIs CART</p>
      <Link to="/" ><u>Login</u></Link>
      <p className="subtitle">or</p>
      <Link to="/signup" ><u>Signup</u></Link>
      <p className="subtitle">here...🚀</p>
      {/* <Link to="/ginniscart">Home</Link>
      <Link to="/ai-helper">AI Helper</Link> */}
    </nav>
    </div>
  );
}
