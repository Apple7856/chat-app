import express from "express";
import {
  createChat,
  findChat,
  findUsersChats,
} from "../controllers/chatController.js";

const router = express.Router();

router.post("/", createChat);
router.get("/:id", findUsersChats);
router.get("/find/:firstId/:secondId", findChat);

export default router;
