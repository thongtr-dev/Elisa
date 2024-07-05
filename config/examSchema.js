import { FunctionDeclarationSchemaType } from "@google/generative-ai";

const examSchemaConfig = {
  description: "Vietnam National High School Graduation Examination - English",
  type: FunctionDeclarationSchemaType.OBJECT,
  properties: {
    parts: {
      type: FunctionDeclarationSchemaType.OBJECT,
      properties: {
        part1: {
          type: FunctionDeclarationSchemaType.OBJECT,
          properties: {
            questionType: {
              type: FunctionDeclarationSchemaType.STRING,
              description:
                "Mark the letter A, B, C, or D on your answer sheet to indicate the word whose underlined part differs from the other three in pronunciation in each of the following questions.",
            },
            numberOfQuestions: {
              type: FunctionDeclarationSchemaType.INTEGER,
              description: "2",
            },
            questions: {
              type: FunctionDeclarationSchemaType.ARRAY,
              description: "List of questions.",
              items: {
                type: FunctionDeclarationSchemaType.OBJECT,
                properties: {
                  question: {
                    type: FunctionDeclarationSchemaType.STRING,
                    description: "The question.",
                  },
                  options: {
                    type: FunctionDeclarationSchemaType.ARRAY,
                    description:
                      "List of options containing opening and closing HTML <strong> and <u> tags to indicate the underlined part.",
                    items: {
                      type: FunctionDeclarationSchemaType.STRING,
                      description:
                        "The option that starts with A., B., C., or D.",
                    },
                  },
                  correctOption: {
                    type: FunctionDeclarationSchemaType.INTEGER,
                    description: "Correct option, from 0 to 3 only.",
                  },
                  answerDetail: {
                    type: FunctionDeclarationSchemaType.STRING,
                    description:
                      "Details or explanation for the answer, in Vietnamese.",
                  },
                },
                required: [
                  "question",
                  "options",
                  "correctOption",
                  "answerDetail",
                ],
              },
            },
          },
          required: ["questionType", "numberOfQuestions", "questions"],
        },
        part2: {
          type: FunctionDeclarationSchemaType.OBJECT,
          properties: {
            questionType: {
              type: FunctionDeclarationSchemaType.STRING,
              description:
                "Mark the letter A, B, C, or D on your answer sheet to indicate the word that differs from the other three in the position of stress in each of the following questions.",
            },
            numberOfQuestions: {
              type: FunctionDeclarationSchemaType.INTEGER,
              description: "2",
            },
            questions: {
              type: FunctionDeclarationSchemaType.ARRAY,
              description: "List of questions.",
              items: {
                type: FunctionDeclarationSchemaType.OBJECT,
                properties: {
                  question: {
                    type: FunctionDeclarationSchemaType.STRING,
                    description: "The question.",
                  },
                  options: {
                    type: FunctionDeclarationSchemaType.ARRAY,
                    description:
                      "List of options containing only one word, without the ' symbol (apostrophe)",
                    items: {
                      type: FunctionDeclarationSchemaType.STRING,
                      description:
                        "The option that starts with A., B., C., or D.",
                    },
                  },
                  correctOption: {
                    type: FunctionDeclarationSchemaType.INTEGER,
                    description: "Correct option, from 0 to 3 only.",
                  },
                  answerDetail: {
                    type: FunctionDeclarationSchemaType.STRING,
                    description:
                      "Details or explanation for the answer, in Vietnamese.",
                  },
                },
                required: [
                  "question",
                  "options",
                  "correctOption",
                  "answerDetail",
                ],
              },
            },
          },
          required: ["questionType", "numberOfQuestions", "questions"],
        },
        part3: {
          type: FunctionDeclarationSchemaType.OBJECT,
          properties: {
            questionType: {
              type: FunctionDeclarationSchemaType.STRING,
              description:
                "Mark the letter A, B, C, or D on your answer sheet to indicate the sentence that best completes each of the following exchanges.",
            },
            numberOfQuestions: {
              type: FunctionDeclarationSchemaType.INTEGER,
              description: "2",
            },
            questions: {
              type: FunctionDeclarationSchemaType.ARRAY,
              description: "List of questions.",
              items: {
                type: FunctionDeclarationSchemaType.OBJECT,
                properties: {
                  question: {
                    type: FunctionDeclarationSchemaType.STRING,
                    description: "The question.",
                  },
                  options: {
                    type: FunctionDeclarationSchemaType.ARRAY,
                    description: "List of options.",
                    items: {
                      type: FunctionDeclarationSchemaType.STRING,
                      description:
                        "The option that starts with A., B., C., or D.",
                    },
                  },
                  correctOption: {
                    type: FunctionDeclarationSchemaType.INTEGER,
                    description: "Correct option, from 0 to 3 only.",
                  },
                  answerDetail: {
                    type: FunctionDeclarationSchemaType.STRING,
                    description:
                      "Details or explanation for the answer, in Vietnamese.",
                  },
                },
                required: [
                  "question",
                  "options",
                  "correctOption",
                  "answerDetail",
                ],
              },
            },
          },
          required: ["questionType", "numberOfQuestions", "questions"],
        },
        part4: {
          type: FunctionDeclarationSchemaType.OBJECT,
          properties: {
            questionType: {
              type: FunctionDeclarationSchemaType.STRING,
              description:
                "Mark the letter A, B, C, or D on your answer sheet to indicate the word(s) OPPOSITE in meaning to the underlined word(s) in each of the following questions.",
            },
            numberOfQuestions: {
              type: FunctionDeclarationSchemaType.INTEGER,
              description: "2",
            },
            questions: {
              type: FunctionDeclarationSchemaType.ARRAY,
              description: "List of questions.",
              items: {
                type: FunctionDeclarationSchemaType.OBJECT,
                properties: {
                  question: {
                    type: FunctionDeclarationSchemaType.STRING,
                    description:
                      "The sentence containing opening and closing HTML <strong> and <u> tags to indicate the underlined part.",
                  },
                  options: {
                    type: FunctionDeclarationSchemaType.ARRAY,
                    description: "List of options.",
                    items: {
                      type: FunctionDeclarationSchemaType.STRING,
                      description:
                        "The option that starts with A., B., C., or D.",
                    },
                  },
                  correctOption: {
                    type: FunctionDeclarationSchemaType.INTEGER,
                    description: "Correct option, from 0 to 3 only.",
                  },
                  answerDetail: {
                    type: FunctionDeclarationSchemaType.STRING,
                    description:
                      "Details or explanation for the answer, in Vietnamese.",
                  },
                },
                required: [
                  "question",
                  "options",
                  "correctOption",
                  "answerDetail",
                ],
              },
            },
          },
          required: ["questionType", "numberOfQuestions", "questions"],
        },
        part5: {
          type: FunctionDeclarationSchemaType.OBJECT,
          properties: {
            questionType: {
              type: FunctionDeclarationSchemaType.STRING,
              description:
                "Mark the letter A, B, C, or D on your answer sheet to indicate the word CLOSEST in meaning to the underlined word in each of the following questions.",
            },
            numberOfQuestions: {
              type: FunctionDeclarationSchemaType.INTEGER,
              description: "2",
            },
            questions: {
              type: FunctionDeclarationSchemaType.ARRAY,
              description: "List of questions.",
              items: {
                type: FunctionDeclarationSchemaType.OBJECT,
                properties: {
                  question: {
                    type: FunctionDeclarationSchemaType.STRING,
                    description:
                      "The sentence containing opening and closing HTML <strong> and <u> tags to indicate the underlined part.",
                  },
                  options: {
                    type: FunctionDeclarationSchemaType.ARRAY,
                    description: "List of options.",
                    items: {
                      type: FunctionDeclarationSchemaType.STRING,
                      description:
                        "The option that starts with A., B., C., or D.",
                    },
                  },
                  correctOption: {
                    type: FunctionDeclarationSchemaType.INTEGER,
                    description: "Correct option, from 0 to 3 only.",
                  },
                  answerDetail: {
                    type: FunctionDeclarationSchemaType.STRING,
                    description:
                      "Details or explanation for the answer, in Vietnamese.",
                  },
                },
                required: [
                  "question",
                  "options",
                  "correctOption",
                  "answerDetail",
                ],
              },
            },
          },
          required: ["questionType", "numberOfQuestions", "questions"],
        },
        part6: {
          type: FunctionDeclarationSchemaType.OBJECT,
          properties: {
            questionType: {
              type: FunctionDeclarationSchemaType.STRING,
              description:
                "Mark the letter A, B, C, or D on your answer sheet to indicate the correct answer to each of the following questions.",
            },
            numberOfQuestions: {
              type: FunctionDeclarationSchemaType.INTEGER,
              description: "15",
            },
            questions: {
              type: FunctionDeclarationSchemaType.ARRAY,
              description: "List of questions.",
              items: {
                type: FunctionDeclarationSchemaType.OBJECT,
                properties: {
                  question: {
                    type: FunctionDeclarationSchemaType.STRING,
                    description: "The question.",
                  },
                  options: {
                    type: FunctionDeclarationSchemaType.ARRAY,
                    description: "List of options.",
                    items: {
                      type: FunctionDeclarationSchemaType.STRING,
                      description:
                        "The option that starts with A., B., C., or D.",
                    },
                  },
                  correctOption: {
                    type: FunctionDeclarationSchemaType.INTEGER,
                    description: "Correct option, from 0 to 3 only.",
                  },
                  answerDetail: {
                    type: FunctionDeclarationSchemaType.STRING,
                    description:
                      "Details or explanation for the answer, in Vietnamese.",
                  },
                },
                required: [
                  "question",
                  "options",
                  "correctOption",
                  "answerDetail",
                ],
              },
            },
          },
          required: ["questionType", "numberOfQuestions", "questions"],
        },
        part7: {
          type: FunctionDeclarationSchemaType.OBJECT,
          properties: {
            questionType: {
              type: FunctionDeclarationSchemaType.STRING,
              description:
                "Read the following passage and mark the letter A, B, C, or D on your answer sheet to indicate the correct word or phrase that best fits each of the numbered blanks from 26 to 30.",
            },
            numberOfQuestions: {
              type: FunctionDeclarationSchemaType.INTEGER,
              description: "5",
            },
            passage: {
              type: FunctionDeclarationSchemaType.STRING,
              description: "The passage for the cloze test.",
            },
            questions: {
              type: FunctionDeclarationSchemaType.ARRAY,
              description: "List of blanks/questions.",
              items: {
                type: FunctionDeclarationSchemaType.OBJECT,
                properties: {
                  question: {
                    type: FunctionDeclarationSchemaType.STRING,
                    description: "Identifier for the blank.",
                  },
                  options: {
                    type: FunctionDeclarationSchemaType.ARRAY,
                    description: "List of options for the blank.",
                    items: {
                      type: FunctionDeclarationSchemaType.STRING,
                      description:
                        "The option that starts with A., B., C., or D.",
                    },
                  },
                  correctOption: {
                    type: FunctionDeclarationSchemaType.INTEGER,
                    description: "Correct option, from 0 to 3 only.",
                  },
                  answerDetail: {
                    type: FunctionDeclarationSchemaType.STRING,
                    description:
                      "Details or explanation for the answer, in Vietnamese.",
                  },
                },
                required: [
                  "question",
                  "options",
                  "correctOption",
                  "answerDetail",
                ],
              },
            },
          },
          required: [
            "questionType",
            "numberOfQuestions",
            "passage",
            "questions",
          ],
        },
        part8: {
          type: FunctionDeclarationSchemaType.OBJECT,
          properties: {
            questionType: {
              type: FunctionDeclarationSchemaType.STRING,
              description:
                "Read the following passage and mark the letter A, B, C, or D on your answer sheet to indicate the correct answer to each of the questions from 31 to 35.",
            },
            numberOfQuestions: {
              type: FunctionDeclarationSchemaType.INTEGER,
              description: "5",
            },
            passage: {
              type: FunctionDeclarationSchemaType.STRING,
              description: "The passage.",
            },
            questions: {
              type: FunctionDeclarationSchemaType.ARRAY,
              description: "List of questions.",
              items: {
                type: FunctionDeclarationSchemaType.OBJECT,
                properties: {
                  question: {
                    type: FunctionDeclarationSchemaType.STRING,
                    description: "The question.",
                  },
                  options: {
                    type: FunctionDeclarationSchemaType.ARRAY,
                    description: "List of options.",
                    items: {
                      type: FunctionDeclarationSchemaType.STRING,
                      description:
                        "The option that starts with A., B., C., or D.",
                    },
                  },
                  correctOption: {
                    type: FunctionDeclarationSchemaType.INTEGER,
                    description: "Correct option, from 0 to 3 only.",
                  },
                  answerDetail: {
                    type: FunctionDeclarationSchemaType.STRING,
                    description:
                      "Details or explanation for the answer, in Vietnamese.",
                  },
                },
                required: [
                  "question",
                  "options",
                  "correctOption",
                  "answerDetail",
                ],
              },
            },
          },
          required: ["questionType", "numberOfQuestions", "questions"],
        },
        part9: {
          type: FunctionDeclarationSchemaType.OBJECT,
          properties: {
            questionType: {
              type: FunctionDeclarationSchemaType.STRING,
              description:
                "Read the following passage and mark the letter A, B, C, or D on your answer sheet to indicate the correct answer to each of the questions from 36 to 42.",
            },
            numberOfQuestions: {
              type: FunctionDeclarationSchemaType.INTEGER,
              description: "7",
            },
            passages: {
              type: FunctionDeclarationSchemaType.ARRAY,
              description: "List of the paired passages.",
              items: {
                type: FunctionDeclarationSchemaType.STRING,
              },
            },
            questions: {
              type: FunctionDeclarationSchemaType.ARRAY,
              description: "List of questions.",
              items: {
                type: FunctionDeclarationSchemaType.OBJECT,
                properties: {
                  question: {
                    type: FunctionDeclarationSchemaType.STRING,
                    description: "The question.",
                  },
                  options: {
                    type: FunctionDeclarationSchemaType.ARRAY,
                    description: "List of options.",
                    items: {
                      type: FunctionDeclarationSchemaType.STRING,
                      description:
                        "The option that starts with A., B., C., or D.",
                    },
                  },
                  correctOption: {
                    type: FunctionDeclarationSchemaType.INTEGER,
                    description: "Correct option, from 0 to 3 only.",
                  },
                  answerDetail: {
                    type: FunctionDeclarationSchemaType.STRING,
                    description:
                      "Details or explanation for the answer, in Vietnamese.",
                  },
                },
                required: [
                  "question",
                  "options",
                  "correctOption",
                  "answerDetail",
                ],
              },
            },
          },
          required: [
            "questionType",
            "numberOfQuestions",
            "passages",
            "questions",
          ],
        },
        part10: {
          type: FunctionDeclarationSchemaType.OBJECT,
          properties: {
            questionType: {
              type: FunctionDeclarationSchemaType.STRING,
              description:
                "Mark the letter A, B, C, or D on your answer sheet to indicate the sentence that is closest in meaning to each of the following questions.",
            },
            numberOfQuestions: {
              type: FunctionDeclarationSchemaType.INTEGER,
              description: "3",
            },
            questions: {
              type: FunctionDeclarationSchemaType.ARRAY,
              description: "List of questions.",
              items: {
                type: FunctionDeclarationSchemaType.OBJECT,
                properties: {
                  question: {
                    type: FunctionDeclarationSchemaType.STRING,
                    description: "The question.",
                  },
                  options: {
                    type: FunctionDeclarationSchemaType.ARRAY,
                    description: "List of options.",
                    items: {
                      type: FunctionDeclarationSchemaType.STRING,
                      description:
                        "The option that starts with A., B., C., or D.",
                    },
                  },
                  correctOption: {
                    type: FunctionDeclarationSchemaType.INTEGER,
                    description: "Correct option, from 0 to 3 only.",
                  },
                  answerDetail: {
                    type: FunctionDeclarationSchemaType.STRING,
                    description:
                      "Details or explanation for the answer, in Vietnamese.",
                  },
                },
                required: [
                  "question",
                  "options",
                  "correctOption",
                  "answerDetail",
                ],
              },
            },
          },
          required: ["questionType", "numberOfQuestions", "questions"],
        },
        part11: {
          type: FunctionDeclarationSchemaType.OBJECT,
          properties: {
            questionType: {
              type: FunctionDeclarationSchemaType.STRING,
              description:
                "Mark the letter A, B, C, or D on your answer sheet to indicate the underlined part that needs correction in each of the following questions.",
            },
            numberOfQuestions: {
              type: FunctionDeclarationSchemaType.INTEGER,
              description: "3",
            },
            questions: {
              type: FunctionDeclarationSchemaType.ARRAY,
              description: "List of questions.",
              items: {
                type: FunctionDeclarationSchemaType.OBJECT,
                properties: {
                  question: {
                    type: FunctionDeclarationSchemaType.STRING,
                    description:
                      "The sentence must contain exactly four pairs of HTML <strong> and <u> tags to clearly indicate the specific parts that need to be underlined for correction.",
                  },
                  options: {
                    type: FunctionDeclarationSchemaType.ARRAY,
                    description: "List of options.",
                    items: {
                      type: FunctionDeclarationSchemaType.STRING,
                      description:
                        "The option that starts with A., B., C., or D.",
                    },
                  },
                  correctOption: {
                    type: FunctionDeclarationSchemaType.INTEGER,
                    description: "Correct option, from 0 to 3 only.",
                  },
                  answerDetail: {
                    type: FunctionDeclarationSchemaType.STRING,
                    description:
                      "Details or explanation for the answer, in Vietnamese.",
                  },
                },
                required: [
                  "question",
                  "options",
                  "correctOption",
                  "answerDetail",
                ],
              },
            },
          },
          required: ["questionType", "numberOfQuestions", "questions"],
        },
        part12: {
          type: FunctionDeclarationSchemaType.OBJECT,
          properties: {
            questionType: {
              type: FunctionDeclarationSchemaType.STRING,
              description:
                "Mark the letter A, B, C, or D on your answer sheet to indicate the sentence that best combines each pair of sentences in the following questions.",
            },
            numberOfQuestions: {
              type: FunctionDeclarationSchemaType.INTEGER,
              description: "2",
            },
            questions: {
              type: FunctionDeclarationSchemaType.ARRAY,
              description: "List of questions.",
              items: {
                type: FunctionDeclarationSchemaType.OBJECT,
                properties: {
                  question: {
                    type: FunctionDeclarationSchemaType.STRING,
                    description: "The question.",
                  },
                  options: {
                    type: FunctionDeclarationSchemaType.ARRAY,
                    description: "List of options.",
                    items: {
                      type: FunctionDeclarationSchemaType.STRING,
                      description:
                        "The option that starts with A., B., C., or D.",
                    },
                  },
                  correctOption: {
                    type: FunctionDeclarationSchemaType.INTEGER,
                    description: "Correct option, from 0 to 3 only.",
                  },
                  answerDetail: {
                    type: FunctionDeclarationSchemaType.STRING,
                    description:
                      "Details or explanation for the answer, in Vietnamese.",
                  },
                },
                required: [
                  "question",
                  "options",
                  "correctOption",
                  "answerDetail",
                ],
              },
            },
          },
          required: ["questionType", "numberOfQuestions", "questions"],
        },
      },
    },
    percentage: {
      type: FunctionDeclarationSchemaType.NUMBER,
      description:
        "The percentage similarity between the original exam and the generated exam after all parts have been provided.",
    },
  },

  required: ["parts"],
};

export default examSchemaConfig;
