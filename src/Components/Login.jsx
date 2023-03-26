import React, { useState } from "react";
import { NavLink, Navigate } from "react-router-dom";
import axios from "axios";

import egg from "./images/loginchick.png";
import "./css/Login_Signup.css";

const Login = ({ setUser: setLoginUser, setLoggedIn, loggedIn }) => {
  const [user, setUser] = useState({
    username: ``,
    password: ``,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      `${process.env.REACT_APP_CHITTERURL}/login`,
      user
    );

    setLoginUser(res.data.user);
    setLoggedIn(res.data.user ? true : false);
    setUser({ username: ``, password: `` });
  };

  return (
    <div>
      {loggedIn && <Navigate to="/" />}
      <form onSubmit={loginHandler} className="login-form">
        <div className="title-box" data-testid="login">
          <h1>Login to your Chitter</h1>
          <p>
            (If you do not have an account yet go to the{" "}
            <NavLink to="/signup" className="signup-link">
              Sign Up
            </NavLink>{" "}
            page)
          </p>
        </div>
        <div className="image-container">
          <img src={egg} alt="egg" className="egg-image" />
        </div>
        <div className="form-container">
          <label>
            Username:
            <input
              type="text"
              name="username"
              defaultValue={user.username}
              onChange={handleChange}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              defaultValue={user.password}
              onChange={handleChange}
            />
          </label>
          <button type="submit" className="login-button">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
