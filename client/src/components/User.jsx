import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";

const User = ({ item, handleUser }) => {
  const [user, setUser] = useState({});
  const { userData, setMembers } = useContext(UserContext);

  useEffect(() => {
    if (!item.isGroupChat) {
      if (item.full_name) {
        setUser(item);
      } else {
        setMembers(item.members);
        const findUser = item.members.find((elem) => elem._id !== userData._id);
        findUser.chatId = item._id;
        setUser(findUser);
      }
    } else {
      item.chatId = item._id;
      setUser(item);
    }
  }, []);

  return (
    <div className="user" onClick={() => handleUser(user)}>
      <img
        src={
          user?.profile_img
            ? user.profile_img
            : "https://t4.ftcdn.net/jpg/01/27/15/89/360_F_127158933_cDZA4suMXsx2n0LQ03FzpX50R7fBaUx2.jpg"
        }
        alt="user_img"
        className="user-img"
      />
      <p className="username">
        {user?.full_name ? user.full_name : user?.name}
      </p>
    </div>
  );
};

export default User;
