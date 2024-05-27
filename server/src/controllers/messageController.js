import Message from "../models/Message.js";

export const sendMessage = async (req, res) => {
  const { chatId, msg } = req.body;

  const newMessage = new Message({
    sender_id: req.user,
    msg,
    chat_id: chatId,
  });
  try {
    const response = await newMessage.save();
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json(error);
  }
};

export const allMessages = async (req, res) => {
  const { chatId } = req.params;
  try {
    const messages = await Message.find({ chat_id: chatId })
      .select("-createdAt -updatedAt")
      .populate("sender_id", "profile_img full_name");
    res.status(200).json(messages);
  } catch (error) {
    res.status(200).json(error);
  }
};
