import express from "express";

import {
  submitExam,
  getExamScore,
  getExamDetailedAnswers,
  getMyTakenExams,
} from "../controllers/takeExamControllers.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, submitExam);
router.route("/:id").get(protect, getExamScore);
router.route("/:id/details").get(protect, getExamDetailedAnswers);
router.route("/mine").get(protect, getMyTakenExams);

export default router;
