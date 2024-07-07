import mongoose from "mongoose";
const { Schema } = mongoose;

const questionSchema = new Schema(
  {
    question: { type: String },
    options: { type: [String] },
    correctOption: { type: Number },
    suggestion: { type: String },
    answerDetail: { type: String },
  },
  { _id: false }
);

const fillInTheBlanksPassageSchema = new Schema(
  {
    questionType: {
      type: String,

      default:
        "Read the passage and fill in the blanks with suitable word or phrase.",
    },
    passage: { type: String },
    questions: { type: [questionSchema] },
  },
  { _id: false }
);

const passageSchema = new Schema(
  {
    questionType: {
      type: String,

      default: "Read the passage and answer the questions.",
    },
    passage: { type: String },
    questions: { type: [questionSchema] },
  },
  { _id: false }
);

const passagesSchema = new Schema(
  {
    questionType: {
      type: String,

      default: "Read the paired passages and answer the questions.",
    },
    passages: { type: [String] },
    questions: { type: [questionSchema] },
  },
  { _id: false }
);

const partSchema = new Schema(
  {
    questionType: { type: String },
    questions: { type: [questionSchema] },
  },
  { _id: false }
);

const examSchema = new Schema(
  {
    parts: {
      part1: { type: partSchema },
      part2: { type: partSchema },
      part3: { type: partSchema },
      part4: { type: partSchema },
      part5: { type: partSchema },
      part6: { type: partSchema },
      part7: { type: fillInTheBlanksPassageSchema },
      part8: { type: passageSchema },
      part9: { type: passagesSchema },
      part10: { type: partSchema },
      part11: { type: partSchema },
      part12: { type: partSchema },
    },
    // The percentage similarity between the original exam
    // and the generated exam after all parts have been provided.
    percentage: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Exam = mongoose.model("Exam", examSchema);
export default Exam;
