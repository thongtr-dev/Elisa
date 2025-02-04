import asyncHandler from "../middleware/asyncHandler.js";
import generateExam from "../utils/generateExam.js";
import Exam from "../models/examModel.js";

/**
 * @desc Create exam
 * @route POST /api/exams
 * @access Private
 */
const createExam = asyncHandler(async (req, res) => {
  const result = await generateExam();
  if (result.error) {
    res.status(502);
    throw new Error(`Bad Gateway: Third-party API error: ${result.error}`);
  }

  if (!result.parts) {
    res.status(500);
    throw new Error("Server error: Missing parts in the result");
  }

  const examData = {
    parts: {},
  };

  result.parts.forEach((part, index) => {
    const partContent = JSON.parse(part.candidates[0].content.parts[0].text);
    if (partContent) {
      const partNumber = `part${index + 1}`;
      examData.parts[partNumber] = partContent;
    } else {
      res.status(500);
      throw new Error(`Server error: Missing exam part ${index + 1}`);
    }
  });

  const exam = await Exam.create(examData);
  if (exam) {
    res.status(201).json({
      examId: exam._id,
    });
  } else {
    res.status(500);
    throw new Error("Server error: Exam was not created. Please try again");
  }
});

/**
 * @desc Get exam by id
 * @route GET /api/exams/:id
 * @access Private
 */
const getExamById = asyncHandler(async (req, res) => {
  const exam = await Exam.findById(req.params.id);
  if (exam) {
    return res.json(exam);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

export { createExam, getExamById };
