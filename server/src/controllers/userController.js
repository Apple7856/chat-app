import User from "../models/User.js";

export const findUsers = async (req, res, next) => {
  const { filterId } = req.query;
  try {
    const response = await User.find({ _id: { $in: JSON.parse(filterId) } });
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const findAllUsers = async (req, res, next) => {
  try {
    const response = await User.find({});
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const findUser = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const response = await User.findOne({ _id: userId });
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const findMatchUser = async (req, res, next) => {
  try {
    const { name } = req.query;
    const userList = await User.find({
      full_name: { $regex: name, $options: "i" },
    });
    res.status(200).json(userList);
  } catch (error) {
    console.log("error");
    next(error);
  }
};
