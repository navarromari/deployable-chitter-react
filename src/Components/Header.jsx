import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./css/Header.css";

import logo from "./images/chicklogo.png";

const Header = ({ setLoggedIn, loggedIn, setUser }) => {
  const navigate = useNavigate();
  const handleSignOut = () => {
    setUser({});
    setLoggedIn(false);
    navigate("/");
  };
  return (
    <header data-testid="header">
      <nav>
        <div className="navbar-left">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
          <Link to="/">
            <h1>Chitter</h1>
          </Link>
        </div>
        <div className="navbar-right">
          {loggedIn ? (
            <button onClick={handleSignOut} className="nav-link">
              Sign Out
            </button>
          ) : (
            <>
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
              <NavLink to="/signup" className="nav-link">
                Sign Up
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
