import Chat from "../models/Chat.js";

export const createGroup = async (req, res, next) => {
  try {
    const findGroup = await Chat.findOne({ name: req.body.name });
    if (findGroup) throw new Error("group name already present.");
    const newGroup = new Chat(req.body);
    const response = await newGroup.save();
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const updateGroup = async (req, res, next) => {
  try {
    await Chat.updateOne({ _id: req.params.groupId }, { $set: req.body });
    res.status(200).send("Group Updated!");
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
