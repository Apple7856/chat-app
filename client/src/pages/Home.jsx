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

  const { userData, setSelectData, accessToken } = useContext(UserContext);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  async function fetchChatUser() {
    try {
      const res = await newRequest.get(`/chat`, config);
      setChatsUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchChatUser();
  }, [!open]);

  const handleSearch = async (event) => {
    setSearch(event.target.value);
    try {
      const response = await newRequest.get(
        `/users/?search=${event.target.value}`,
        config
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

  const handleUser = (user) => {
    setSelectData(user);
    setChatId(user.chatId);
    setIsBlank(false);
    setIsShow(true);
  };

  const handleSearchUser = async (user) => {
    try {
      const data = {
        firstUserId: userData._id,
        secondUserId: user._id,
      };
      const newChatUser = await newRequest.post("/chat", data, config);
      setSelectData(
        newChatUser.data.members.find((elem) => elem._id !== userData._id)
      );
      if (!chatsUsers.some((elem) => elem._id === newChatUser.data._id)) {
        setChatsUsers([...chatsUsers, newChatUser.data]);
      }
      setChatId(newChatUser.data._id);
      setIsBlank(false);
      setIsShow(true);
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
