import express from "express";
import {
  createGroup,
  deleteGroup,
  updateGroup,
} from "../controllers/groupController.js";

const router = express.Router();

router.post("/", createGroup);
router.put("/:groupId", updateGroup);
router.delete("/:groupId", deleteGroup);

export default router;
