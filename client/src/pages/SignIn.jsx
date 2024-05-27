import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import newRequest from "../utils/newRequest";
import { UserContext } from "../App";

const SignIn = () => {
  const [user, setUser] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const { setUserData } = useContext(UserContext);

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const config = { headers: { "Content-Type": "application/json" } };
    try {
      const res = await newRequest.post("/auth/login", user, config);
      localStorage.setItem("token", JSON.stringify(res.data.token));
      setUserData(res.data);
      navigate("/");
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="main-box">
        <h3 className="heading">Login</h3>
        <form className="form-data" onSubmit={handleLogin}>
          <input
            className="input-box"
            type="email"
            placeholder="Email"
            name="email"
            required
            onChange={handleChange}
          />
          <input
            className="input-box"
            type="password"
            placeholder="password"
            name="password"
            required
            onChange={handleChange}
          />
          <button className="button">Sign In</button>
        </form>
        {errorMessage && <p className="error-msg">{errorMessage}</p>}
        <div className="text-box">
          <p className="para">Not a member yet?</p>
          <Link to={"/sign-up"} className="link">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
