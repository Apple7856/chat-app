import React, { useContext } from "react";
import { UserContext } from "../App";

const Navbar = ({ setOpen }) => {
  const { setUserData } = useContext(UserContext);

  const handleClick = () => {
    localStorage.removeItem("res");
    setUserData("");
  };

  return (
    <div className="nav-container">
      <h3 className="heading">Chat App</h3>
      <div className="menu-box">
        <button className="btn" onClick={() => setOpen(true)}>
          Create Group
        </button>
        <button className="btn" onClick={handleClick}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
