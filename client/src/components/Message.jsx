import React from "react";

const Message = ({ msg }) => {
  return (
    <div className="message-user">
      <p className="username">{msg.user[0].full_name}</p>
      <div className="message">
        <p className="user-message">{msg.msg}</p>
      </div>
    </div>
  );
};

export default Message;
