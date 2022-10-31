import { AuthContext } from "context/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/">
          <span className="logo">myBooking</span>
        </Link>
        {user ? (
          <div>
            <span> {user.username} </span>
            <button className="navButton" onClick={logout}>
              Logout
            </button>
          </div>
        ) : (
          <div className="navItems">
            <Link to="/register">
              <button className="navButton">Register</button>
            </Link>
            <Link to="/login">
              <button className="navButton">Login</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
