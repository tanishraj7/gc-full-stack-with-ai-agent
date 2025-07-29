import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import "./Nav.css";
import { AiOutlineShoppingCart, AiOutlineUserAdd } from "react-icons/ai";
import { TbShoe } from "react-icons/tb";

 function Nav({handleInputChange,query}) {
  return (
    <nav>
        <div className="logo-container">
            <a href="/ginniscart">
            <img className="main-logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Eo_circle_green_letter-g.svg/768px-Eo_circle_green_letter-g.svg.png?2020041713265" alt="logo"/></a>
            <TbShoe className="main-logo"/>
        </div>
        <h1 className="main-title">GINNIs CART</h1>
        <div className="nav-container">
            <input type="text" className="search-input" onChange={handleInputChange} value= {query} placeholder="👟Search" ></input>
        </div>
        <div className="profile-container">
            <Link to="/" className="ai-bttn">LogOut</Link>
            <Link to="/ai-helper" className="ai-bttn">Ai-helper</Link>
            <a href="https://crepdogcrew.com" target="_main">
                <FiHeart className="nav-icons"/>
            </a>
            <a href="https://crepdogcrew.com" target="_main">
                <AiOutlineShoppingCart className="nav-icons"/>
            </a>
            <a href="https://crepdogcrew.com" target="_main">
                <AiOutlineUserAdd className="nav-icons"/>
            </a>
        </div>
    </nav>
  )
}
export default Nav;