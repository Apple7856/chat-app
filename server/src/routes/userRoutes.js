import express from "express";
import {
  findListArrayUsers,
  findUser,
  loginUser,
  findUsers,
} from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, findUsers);
router.get("/login-user", protect, loginUser);
router.get("/list", protect, findListArrayUsers);
router.get("/:userId", protect, findUser);

export default router;
