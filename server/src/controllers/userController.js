import User from "../models/User.js";

export const findUsers = async (req, res, next) => {
  const searchKey = req.query.search
    ? {
        $and: [
          { full_name: { $regex: req.query.search, $options: "i" } },
          { _id: { $ne: req.user._id } },
        ],
      }
    : {};
  try {
    const response = await User.find(searchKey)
      .find({
        _id: { $ne: req.user },
      })
      .select("-password -createdAt -updatedAt");
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const response = await User.findById(req.user, {
      password: 0,
      createdAt: 0,
      updatedAt: 0,
    });
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const findListArrayUsers = async (req, res, next) => {
  try {
    const listUsers = req.query.list
      ? {
          _id: { $in: JSON.parse(req.query.list) },
        }
      : {};
    const response = await User.find(listUsers, {
      password: 0,
      createdAt: 0,
      updatedAt: 0,
    });
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const findUser = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const response = await User.findOne(
      { _id: userId },
      { password: 0, createdAt: 0, updatedAt: 0 }
    );
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
