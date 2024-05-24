import express from "express";
import { login, register } from "../controllers/authController.js";
import upload from "../utils/uploadImg.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", upload.single("profile_img"), register);

export default router;
