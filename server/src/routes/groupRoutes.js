import express from "express";
import {
  createGroup,
  renameGroup,
  addUserInGroup,
  removeUserInGroup,
  deleteGroup,
} from "../controllers/groupController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createGroup);
router.put("/rename", protect, renameGroup);
router.put("/add-user", protect, addUserInGroup);
router.put("/remove-user", protect, removeUserInGroup);
router.delete("/:chatId", protect, deleteGroup);

export default router;
