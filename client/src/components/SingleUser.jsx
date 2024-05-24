import React, { useContext } from "react";
import { UserContext } from "../App";

const SingleUser = () => {
  const { selectData } = useContext(UserContext);
  return (
    <div className="single-user">
      <div className="img-box">
        <img
          src={
            selectData.profile_img
              ? selectData.profile_img
              : "https://t4.ftcdn.net/jpg/01/27/15/89/360_F_127158933_cDZA4suMXsx2n0LQ03FzpX50R7fBaUx2.jpg"
          }
          alt="user_pic"
          className="img"
        />
      </div>
      <h3 className="heading">
        {selectData.full_name ? selectData.full_name : selectData.name}
      </h3>
      {selectData.email && <p className="desc">Email: {selectData.email}</p>}
      {selectData.contact_no && (
        <p className="desc">Contact: {selectData.contact_no}</p>
      )}
    </div>
  );
};

export default SingleUser;
