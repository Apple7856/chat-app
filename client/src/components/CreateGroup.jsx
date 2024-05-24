import React, { useContext, useEffect, useState } from "react";
import newRequest from "../utils/newRequest";
import User from "./User";
import { UserContext } from "../App";

const CreateGroup = ({ setOpen }) => {
  const [data, setData] = useState([]);

  const { userData } = useContext(UserContext);

  const [newGroup, setNewGroup] = useState({
    groupName: "",
    users: [],
  });

  useEffect(() => {
    async function getUsers() {
      try {
        const res = await newRequest.get("/users/all");
        let filterData = res.data.filter((item) => item._id !== userData._id);
        setData(filterData);
      } catch (error) {
        console.log(error);
      }
    }
    getUsers();
  }, []);

  const handleInput = (event) => {
    setNewGroup({ ...newGroup, groupName: event.target.value });
  };

  const handleUser = (user) => {
    newGroup.users.some((id) => id === user._id)
      ? setNewGroup({
          ...newGroup,
          users: newGroup.users.filter((id) => id !== user._id),
        })
      : setNewGroup({ ...newGroup, users: [...newGroup.users, user._id] });
  };

  const createGroup = async () => {
    try {
      if (newGroup.groupName && newGroup.users.length >= 1) {
        const data = {
          name: newGroup.groupName,
          members: [...newGroup.users, userData._id],
        };
        const response = await newRequest.post("/group", data);
        setOpen(false);
      } else {
        alert("Group name is required and atleast 1 user select");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="group-modal">
      <div className="main-box">
        <div className="header">
          <h3 className="heading">Create New Group</h3>
          <button className="close" onClick={() => setOpen(false)}>
            close
          </button>
        </div>
        <div className="input-box">
          <input
            type="text"
            name="group-name"
            className="input"
            placeholder="Group Name"
            onChange={handleInput}
          />
          <button className="btn" onClick={createGroup}>
            Create Group
          </button>
        </div>
        <div className="user-list">
          {data.map((item) => (
            <div
              className={`${newGroup.users.includes(item._id) && "selected"}`}
              key={item._id}
            >
              <User item={item} handleUser={handleUser} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateGroup;
