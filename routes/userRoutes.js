import express from "express";

import {
  loginUser,
  registerUser,
  logoutUser,
  updateUserProfile,
} from "../controllers/userController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/profile").put(protect, updateUserProfile);

export default router;
