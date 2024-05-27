import React, { useContext, useEffect, useRef, useState } from "react";
import Message from "./Message";
import { UserContext } from "../App";
import newRequest from "../utils/newRequest";
import { io } from "socket.io-client";

const ChatBox = ({ handleShowUserDetails, chatId }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();

  const { selectData, userData, accessToken } = useContext(UserContext);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  // useEffect(() => {
  //   socket.current = io("ws://localhost:4000");
  // }, []);

  // useEffect(() => {
  //   socket.current.on("getMessage", (data) => {
  //     console.log(data);
  //     setArrivalMessage({
  //       sender_id: data.senderId,
  //       chat_id: chatId,
  //       msg: data.text,
  //       user: data.user,
  //     });
  //   });
  // }, [socket.current]);

  // useEffect(() => {
  //   arrivalMessage &&
  //     selectData._id === arrivalMessage.sender_id &&
  //     setMessages((prev) => [...prev, arrivalMessage]);
  // }, [arrivalMessage, chatId]);

  // useEffect(() => {
  //   socket.current.emit("addUser", userData._id);
  //   socket.current.on("getUsers", (users) => {
  //     console.log(users);
  //   });
  // }, [chatId, userData]);

  useEffect(() => {
    async function getAllMessage() {
      try {
        const msg = await newRequest.get(`/message/${chatId}`, config);
        setMessages(msg.data);
      } catch (error) {
        console.log(error);
      }
    }
    getAllMessage();
  }, [chatId]);

  const handleSendMessage = async () => {
    let data = {
      chatId: chatId,
      msg: message,
    };
    // socket.current.emit("sendMessage", {
    //   senderId: userData._id,
    //   receiverId: selectData._id,
    //   text: message,
    //   user: [
    //     {
    //       _id: userData._id,
    //       profile_img: userData.profile_img,
    //       full_name: userData.full_name,
    //     },
    //   ],
    // });
    const newMessage = await newRequest.post(`/message`, data, config);
    const resData = {
      _id: newMessage.data._id,
      chat_id: newMessage.data.chat_id,
      msg: newMessage.data.msg,
      sender_id: {
        _id: userData._id,
        profile_img: userData.profile_img,
        full_name: userData.full_name,
      },
    };
    setMessages([...messages, resData]);
    setMessage("");
  };

  return (
    <div className="chat-box">
      <div className="chat-header">
        <img
          src={
            selectData.profile_img
              ? selectData.profile_img
              : "https://t4.ftcdn.net/jpg/01/27/15/89/360_F_127158933_cDZA4suMXsx2n0LQ03FzpX50R7fBaUx2.jpg"
          }
          alt="user_img"
          className="user-img"
        />
        <p className="username" onClick={handleShowUserDetails}>
          {selectData.full_name ? selectData.full_name : selectData.name}
        </p>
      </div>
      <div className="message-box">
        {messages.map((msg, index) => (
          <div className="message-card" key={index}>
            <Message msg={msg} />
          </div>
        ))}
      </div>
      <div className="input-box">
        <input
          type="text"
          placeholder="Write your message..."
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="chat-input"
        />
        <button className="send-btn" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
