import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import newRequest from "../utils/newRequest";
import { UserContext } from "../App";

const SignUp = () => {
  const [user, setUser] = useState({});
  const [file, setFile] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { setUserData } = useContext(UserContext);

  const navigate = useNavigate();
  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const formDataToSend = new FormData();
    formDataToSend.append("full_name", user.name);
    formDataToSend.append("email", user.email);
    formDataToSend.append("contact_no", user.contact);
    formDataToSend.append("password", user.password);
    formDataToSend.append("profile_img", file);
    try {
      const res = await newRequest.post(
        "/auth/register",
        formDataToSend,
        config
      );
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
        <h3 className="heading">Register</h3>
        <form className="form-data" onSubmit={handleCreate}>
          <input
            type="file"
            className="file-box"
            accept="image/png, image/gif, image/jpeg"
            name="profile_img"
            required
            onChange={(event) => setFile(event.target.files[0])}
          />
          <input
            className="input-box"
            type="text"
            placeholder="Full name"
            name="name"
            required
            onChange={handleChange}
          />
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
            type="number"
            placeholder="Mobile no."
            name="contact"
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
          <button className="button">Create</button>
        </form>
        {errorMessage && <p className="error-msg">{errorMessage}</p>}
        <div className="text-box">
          <p className="para">Already have an account?</p>
          <Link to={"/sign-in"} className="link">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
