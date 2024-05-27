import Chat from "../models/Chat.js";
import User from "../models/User.js";

export const accessChat = async (req, res) => {
  const { firstUserId, secondUserId } = req.body;
  try {
    const isChat = await Chat.findOne({
      isGroupChat: false,
      members: { $all: [firstUserId, secondUserId] },
    })
      .select("-createdAt -updatedAt")
      .populate("members", "profile_img full_name isAdmin email contact_no")
      .populate("groupAdmin", "profile_img full_name isAdmin");

    if (isChat) return res.status(200).json(isChat);
    const newChat = new Chat({
      isGroupChat: false,
      members: [firstUserId, secondUserId],
    });
    const response = await newChat
      .save()
      .select("-createdAt -updatedAt")
      .populate("members", "profile_img full_name isAdmin email contact_no")
      .populate("groupAdmin", "profile_img full_name isAdmin");
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const findUsersChats = async (req, res) => {
  try {
    const chats = await Chat.find({
      members: { $in: [req.user] },
    })
      .select("-createdAt -updatedAt")
      .populate("members", "profile_img full_name isAdmin email contact_no")
      .populate("groupAdmin", "profile_img full_name isAdmin");
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const findChat = async (req, res) => {
  const { firstId, secondId } = req.params;
  try {
    const chat = await Chat.find({
      members: { $all: [firstId, secondId] },
    });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};
