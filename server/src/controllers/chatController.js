import Chat from "../models/Chat.js";

export const createChat = async (req, res) => {
  const { firstUserId, secondUserId } = req.body;
  try {
    const chat = await Chat.findOne({
      members: { $all: [firstUserId, secondUserId] },
    });
    if (chat) return res.status(200).json(chat);
    const newChat = new Chat({
      members: [firstUserId, secondUserId],
    });
    const response = await newChat.save();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const findUsersChats = async (req, res) => {
  const userId = req.params.id;
  try {
    const chats = await Chat.find({
      members: { $in: [userId] },
    });
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
