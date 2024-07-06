import express from "express";

import {
  createExam,
  createExamFromMistakes,
  getExamById,
} from "../controllers/examController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, createExam);
router.route("/mistakes").post(protect, createExamFromMistakes);
router.route("/:id").get(protect, getExamById);

export default router;
