import { NavLink } from "react-router-dom"
import "../App.css"

function Navbar() {
    return <header className="header">
        <div className="container">
        <nav className="nav">
        <div>
            <NavLink to="/">Upload images</NavLink>
        </div>
            <ul>
                <li><NavLink className={({isActive}) => (isActive ? "active-link": "")} to="/">Home</NavLink></li>
                <li><NavLink className={({isActive}) => (isActive ? "active-link": "")} to="/local">Local upload</NavLink></li>
                <li><NavLink className={({isActive}) => (isActive ? "active-link": "")} to="/cloudinary">Cloudinary upload</NavLink></li>
                <li><NavLink className={({isActive}) => (isActive ? "active-link": "")} to="/aws">AWS upload</NavLink></li>
            </ul>
        </nav>
        </div>
    </header>
}

export default Navbar