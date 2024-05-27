import express from "express";
import {
  accessChat,
  findChat,
  findUsersChats,
} from "../controllers/chatController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, accessChat);
router.get("/", protect, findUsersChats);

export default router;
