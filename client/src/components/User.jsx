import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import newRequest from "../utils/newRequest";

const User = ({ item, handleUser }) => {
  const [user, setUser] = useState({});
  const { userData } = useContext(UserContext);

  useEffect(() => {
    if (item.members && !item.name) {
      const config = { headers: { "Content-Type": "application/json" } };
      const findUser = item.members.find((elem) => elem !== userData._id);
      async function getUser() {
        const response = await newRequest.get(`/users/${findUser}`, config);
        setUser(response.data);
      }
      getUser();
    } else {
      setUser(item);
    }
  }, []);
  return (
    <div className="user" onClick={() => handleUser(user, item?._id)}>
      <img
        src={
          user.profile_img
            ? user.profile_img
            : "https://t4.ftcdn.net/jpg/01/27/15/89/360_F_127158933_cDZA4suMXsx2n0LQ03FzpX50R7fBaUx2.jpg"
        }
        alt="user_img"
        className="user-img"
      />
      <p className="username">{user.full_name ? user.full_name : user.name}</p>
    </div>
  );
};

export default User;
