import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import egg from "./images/signupegg.png";
import "./css/Login_Signup.css";

const Signup = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: ``,
    password: ``,
    email: ``,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    const { username, password, email } = user;

    if (username && password && email) {
      const res = await axios.post(
        `${process.env.REACT_APP_CHITTERURL}/signup`,
        user
      );
      alert(res.data.message);
      setUser({ password: ``, username: ``, email: `` });
      navigate("/login");
    } else {
      alert(`Invalid input`);
    }
  };

  return (
    <form onSubmit={signupHandler} className="signup-form">
      <div className="title-box" data-testid="signup">
        <h1>Sign Up for Chitter</h1>
        <p>(Get Peeping)</p>
      </div>
      <div className="image-container">
        <img src={egg} alt="egg" className="egg-image" />
      </div>
      <div className="form-container">
        <label>
          Insert <b>username:</b>
          <input
            type="text"
            name="username"
            defaultValue={user.username}
            onChange={handleChange}
          />
        </label>
        <label>
          Insert <b>password:</b>
          <input
            type="password"
            name="password"
            defaultValue={user.password}
            onChange={handleChange}
          />
        </label>
        <label>
          Insert your <b>email:</b>
          <input
            type="email"
            name="email"
            defaultValue={user.email}
            onChange={handleChange}
          />
        </label>
        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default Signup;
