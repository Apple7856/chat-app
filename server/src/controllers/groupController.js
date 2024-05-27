import Chat from "../models/Chat.js";

export const createGroup = async (req, res, next) => {
  try {
    let users = req.body.members;
    if (!users || !req.body.name) {
      return res.status(400).send({ message: "Please Fill all the feilds" });
    }
    users.push(req.user);
    if (users.length <= 1) {
      return res
        .status(400)
        .send("More than 1 users are required to form a group chat");
    }
    const groupChat = new Chat({
      name: req.body.name,
      members: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const response = await groupChat.save();

    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const renameGroup = async (req, res, next) => {
  const { chatId, groupName } = req.body;
  try {
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        name: groupName,
      },
      {
        new: true,
      }
    )
      .populate("members", "-password")
      .populate("groupAdmin", "-password");

    if (!updatedChat) {
      res.status(404);
      throw new Error("Chat Not Found");
    } else {
      res.status(200).json(updatedChat);
    }
  } catch (error) {
    next(error);
  }
};

export const addUserInGroup = async (req, res, next) => {
  const { chatId, userId } = req.body;
  try {
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: { members: userId },
      },
      {
        new: true,
      }
    )
      .populate("members", "-password")
      .populate("groupAdmin", "-password");

    if (!updatedChat) {
      res.status(404);
      throw new Error("Chat Not Found");
    } else {
      res.status(200).json(updatedChat);
    }
  } catch (error) {
    next(error);
  }
};

export const removeUserInGroup = async (req, res, next) => {
  const { chatId, userId } = req.body;
  try {
    const updatedChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        $pull: { members: userId },
      },
      {
        new: true,
      }
    )
      .populate("members", "-password")
      .populate("groupAdmin", "-password");

    if (!updatedChat) {
      res.status(404);
      throw new Error("Chat Not Found");
    } else {
      res.status(200).json(updatedChat);
    }
  } catch (error) {
    next(error);
  }
};

export const deleteGroup = async (req, res, next) => {
  try {
    await Chat.deleteOne({ _id: req.params.groupId });
    res.status(200).send("Group deleted!");
  } catch (error) {
    next(error);
  }
};
