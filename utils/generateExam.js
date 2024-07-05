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
  You are an API designed to assist Vietnamese students in practicing for their ${examSchemaConfig.description}. The total number of questions must be 50. Part 1, 2, 3, 4, 5 and 12, each part must have 2 questions. Part 6 must have 15 questions. Part 7 and 8, each part must have 5 questions. Part 9 must have 7 questions and 2 passages. Part 10 and 11, each part must have 3 questions. Part 2 questions must have list of options containing only one word, do not include the ' symbol (apostrophe). The options for each question must start with A., B., C. or D. The questions for each part should include only the question or sentence itself, without the question number. The detailed answers for each question must be in Vietnamese. Additionally, you need to return the percentage match between the real exam and the generated one after all exam parts have been provided, number only, without the percent sign. You return JSON formatted according to this JSON schema:
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

const safetySettings = [
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
];

const generationConfig = (schema, maxOutputTokens = 2048) => ({
  temperature: 0.9,
  topK: 1,
  topP: 1,
  maxOutputTokens,
  responseMimeType: "application/json",
  responseSchema: schema,
});

const fetchPart = async (partSchema, partNumber) => {
  const parts = [{ text: `Give me part ${partNumber} of the exam.` }];

  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig: generationConfig(partSchema, 2048),
      safetySettings,
    });

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
    const partSchema = examSchemaConfig.properties.parts.properties[`part${i}`];
    fetchPartPromises.push(fetchPart(partSchema, i));
  }

  try {
    const allPartsResults = await Promise.all(fetchPartPromises);

    for (const result of allPartsResults) {
      if (result.error) {
        return { error: result.error };
      }
    }

    const parts = [{ text: "Give me the percentage value." }];

    const percentageResult = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig: generationConfig(
        examSchemaConfig.properties.percentage,
        200
      ),
      safetySettings,
    });

    if (percentageResult.response.promptFeedback?.blockReason) {
      return {
        error: `Blocked for ${percentageResult.response.promptFeedback.blockReason}`,
      };
    }

    return {
      parts: allPartsResults.map((result) => result.response),
      percentage: percentageResult.response,
    };
  } catch (error) {
    return { error: error.message || "Server error. Cannot generate exam" };
  }
};

export default generateExam;
