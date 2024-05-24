import express from "express";
import {
  findAllUsers,
  findUser,
  findUsers,
  findMatchUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", findUsers);
router.get("/all", findAllUsers);
router.get("/filter", findMatchUser);
router.get("/:userId", findUser);
// router.get("/", findMatchUser);

export default router;
