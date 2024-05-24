import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SEC_KEY, {
    expiresIn: "3d",
  });
};

const baseUrl = "http://localhost:8008/assets/";

export const register = async (req, res, next) => {
  const { full_name, email, contact_no, password } = req.body;
  try {
    const profile_img = baseUrl + req.file.filename;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      profile_img,
      full_name,
      email,
      contact_no,
      password: passwordHash,
    });
    const createdUser = await newUser.save();
    const token = createToken(createdUser._id);
    delete createdUser._doc.password;
    res.status(201).json({ token, ...createdUser._doc });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user)
      return res.status(400).json({ message: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials." });

    const token = createToken(user._doc._id);
    delete user.password;
    res.status(200).json({ token, ...user._doc });
  } catch (error) {
    next(error);
  }
};
