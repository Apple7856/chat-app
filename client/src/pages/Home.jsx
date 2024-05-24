import React, { useContext, useEffect, useState } from "react";
import User from "../components/User";
import Navbar from "../components/Navbar";
import newRequest from "../utils/newRequest";
import Search from "../components/Search";
import ChatBox from "../components/ChatBox";
import BlankBox from "../components/BlankBox";
import SingleUser from "../components/SingleUser";
import { UserContext } from "../App";
import CreateGroup from "../components/CreateGroup";

const Home = () => {
  const [chatsUsers, setChatsUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [chatId, setChatId] = useState("");
  const [isBlank, setIsBlank] = useState(true);
  const [isShow, setIsShow] = useState(false);
  const [filterUser, setFilterUser] = useState([]);
  const [open, setOpen] = useState(false);

  const { userData, setSelectData } = useContext(UserContext);

  async function fetchChatUser() {
    const config = { headers: { "Content-Type": "application/json" } };
    const res = await newRequest.get(`/chat/${userData._id}`, config);
    setChatsUsers(res.data);
  }

  useEffect(() => {
    fetchChatUser();
  }, [!open]);

  const handleSearch = async (event) => {
    setSearch(event.target.value);
    try {
      const response = await newRequest.get(
        `/users/filter?name=${event.target.value}`
      );
      setFilterUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowUserDetails = () => {
    setIsBlank(false);
    setIsShow(false);
  };

  const handleUser = (user, id) => {
    setSelectData(user);
    setChatId(id);
    setIsBlank(false);
    setIsShow(true);
  };

  const handleSearchUser = async (user) => {
    try {
      const data = {
        firstUserId: userData._id,
        secondUserId: user._id,
      };
      await newRequest.post("/chat", data);
      fetchChatUser();
      setSearch("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main-container">
      <Navbar setOpen={setOpen} />
      <div className="container">
        <div className="user-box">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search user or group"
              className="search"
              value={search}
              onChange={handleSearch}
            />
          </div>
          {search && (
            <Search filterUser={filterUser} handleUser={handleSearchUser} />
          )}
          <div className="user-list">
            {chatsUsers.map((item, index) => {
              return (
                <div className="map" key={index}>
                  <User item={item} handleUser={handleUser} />
                </div>
              );
            })}
          </div>
        </div>
        {isBlank ? (
          <BlankBox />
        ) : isShow ? (
          <ChatBox
            handleShowUserDetails={handleShowUserDetails}
            chatId={chatId}
          />
        ) : (
          <SingleUser />
        )}
      </div>
      {open && <CreateGroup setOpen={setOpen} />}
    </div>
  );
};

export default Home;
