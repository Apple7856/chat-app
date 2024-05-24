import Message from "../models/Message.js";
import mongoose from "mongoose";

export const createMessage = async (req, res) => {
  const { chatId, senderId, msg } = req.body;
  const newMessage = new Message({ chat_id: chatId, sender_id: senderId, msg });
  try {
    const response = await newMessage.save();
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json(error);
  }
};

export const getMessages = async (req, res) => {
  const { chatId } = req.params;
  try {
    const messages = await Message.aggregate([
      {
        $match: { chat_id: chatId },
      },
      {
        $lookup: {
          from: "users",
          localField: "sender_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $project: {
          createdAt: 0,
          updatedAt: 0,
          "user.createdAt": 0,
          "user.email": 0,
          "user.contact_no": 0,
          "user.password": 0,
          "user.updatedAt": 0,
        },
      },
    ]);
    res.status(200).json(messages);
  } catch (error) {
    res.status(200).json(error);
  }
};
