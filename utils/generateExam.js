import dotenv from "dotenv";
dotenv.config();
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import examSchemaConfig from "../config/examSchema.js";

const MODEL_NAME = "gemini-1.5-pro";

const SYSTEM_INSTRUCTION = `
  You are an API created to help Vietnamese students prepare for their Vietnam National High School Graduation Examination in English. Each question's options should begin with A., B., C., or D., and the number of questions in each section should match with "numberOfQuestions". The content of each part must strictly adhere to the "description". All responses should be in English, except for "answerDetail", which should be in Vietnamese and shortest. "question" is only the question or sentence itself, without the question number. The JSON format should comply with the specified JSON schema:
  ${JSON.stringify(examSchemaConfig, null, 2)}
`;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: MODEL_NAME,
  systemInstruction: {
    parts: [{ text: SYSTEM_INSTRUCTION }],
    role: "model",
  },
});

const fetchPart = async (partSchema, partNumber) => {
  const GENERATION_CONFIG = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
    responseMimeType: "application/json",
    responseSchema: partSchema,
  };

  const PARTS = [{ text: `Give me part ${partNumber} of the exam.` }];

  const result = await model.generateContent({
    contents: [{ role: "user", parts: PARTS }],
    generationConfig: GENERATION_CONFIG,
    safetySettings: [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ],
  });

  try {
    if (result.response.promptFeedback?.blockReason) {
      return {
        error: `Blocked for ${result.response.promptFeedback.blockReason}`,
      };
    }

    return { response: result.response };
  } catch (error) {
    return { error: error.message || "Server error. Cannot generate exam" };
  }
};

const generateExam = async () => {
  const fetchPartPromises = [];
  for (let i = 1; i <= 12; i++) {
    const partSchema =
      JSON.parse(examSchemaConfig).properties.parts.properties[`part${i}`];
    fetchPartPromises.push(fetchPart(partSchema, i));
  }
  const allPartsResults = await Promise.all(fetchPartPromises);
  for (let result of allPartsResults) {
    if (result.error) {
      return { error: result.error };
    }
  }

  return { response: allPartsResults.map((result) => result.response) };
};

export default generateExam;
