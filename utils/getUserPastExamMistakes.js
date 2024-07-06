import TakeExam from "../models/takeExamModel.js";
import Exam from "../models/examModel.js";

const getUserPastExamMistakes = async (userId) => {
  const recentTaken = await TakeExam.findOne({ userId }).sort({
    createdAt: -1,
  });

  if (!recentTaken) {
    throw new Error("User doesn't have any taken exam");
  }

  const recentExam = await Exam.findById(recentTaken.examId);

  if (!recentExam) {
    throw new Error("Exam not found");
  }

  let mistakes = [];

  for (let i = 1; i <= 12; i++) {
    const part = recentExam.parts[`part${i}`];
    if (part && Array.isArray(part.questions)) {
      mistakes.push(
        ...part.questions.map((q) => ({
          question: q.question,
          options: q.options,
          correctOption: q.correctOption,
        }))
      );
    }
  }

  mistakes = mistakes.map((s, index) => ({
    ...s,
    userAnswer: recentTaken.userAnswers?.[index] ?? null,
  }));

  return mistakes;
};

export default getUserPastExamMistakes;
