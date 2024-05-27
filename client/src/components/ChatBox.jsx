import React, { useContext, useEffect, useRef, useState } from "react";
import Message from "./Message";
import { UserContext } from "../App";
import newRequest from "../utils/newRequest";
import { io } from "socket.io-client";

const ChatBox = ({ handleShowUserDetails, chatId }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(io("ws://localhost:4000"));

  const { selectData, userData, accessToken, members } =
    useContext(UserContext);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };

  useEffect(() => {
    socket.emit("setup", userData);
    socket.on("connected", () => console.log("connected"));
  }, [chatId]);

  useEffect(() => {
    async function getAllMessage() {
      try {
        const msg = await newRequest.get(`/message/${chatId}`, config);
        setMessages(msg.data);
        socket.emit("join chat", chatId);
      } catch (error) {
        console.log(error);
      }
    }
    getAllMessage();
  }, [chatId]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      console.log({ newMessageRecieved });
      if (chatId === newMessageRecieved.chat_id) {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  const handleSendMessage = async () => {
    let data = {
      chatId: chatId,
      msg: message,
    };
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
    resData.members = members;
    socket.emit("new message", resData);
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
