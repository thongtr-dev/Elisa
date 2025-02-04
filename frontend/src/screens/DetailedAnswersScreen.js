import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Button, Modal } from "react-bootstrap";
import { useGetExamDetailedAnswersQuery } from "../slices/takeExamApiSlice";
import Message from "../components/Message";
import Loader from "../components/Loader";

const DetailedAnswersScreen = () => {
  const { id: takenId } = useParams();
  const { data, isLoading, error } = useGetExamDetailedAnswersQuery(takenId);

  const [correctAnswers, setCorrectAnswers] = useState({});
  const [showModalSuggest, setShowModalSuggest] = useState(false);
  const [showModalAnswer, setShowModalAnswer] = useState(false);
  const [modalSuggestContent, setmodalSuggestContent] = useState("");
  const [modalAnswerContent, setModalAnswerContent] = useState("");
  const [num, setNum] = useState(null);

  useEffect(() => {
    if (!isLoading && data) {
      const { parts } = data.exam;

      const temp = [];

      for (let i = 1; i <= 12; i++) {
        temp.push(
          ...parts[`part${i}`].questions.map((q) => ({
            correctOption: q.correctOption,
            suggestion: q.suggestion,
            answerDetail: q.answerDetail,
          }))
        );
      }

      let updatedCorrectAnswers = { ...correctAnswers };

      temp.forEach(({ correctOption, suggestion, answerDetail }, index) => {
        updatedCorrectAnswers[index] = {
          correctOption,
          suggestion,
          answerDetail,
        };
      });

      setCorrectAnswers(updatedCorrectAnswers);
    }
  }, [isLoading, data]);

  const renderQuestions = (questions) =>
    questions.map((question) => (
      <div key={question._id}>
        <span>
          <strong>Question {++questionNum}</strong>:{" "}
          <span dangerouslySetInnerHTML={{ __html: question.question }}></span>
        </span>

        <ul className='options'>
          {question.options.map((option, i) => (
            <li dangerouslySetInnerHTML={{ __html: option }} key={i}></li>
          ))}
        </ul>
      </div>
    ));

  const options = ["A", "B", "C", "D"];
  let questionNum = 0;

  const showModalSuggestHandler = (content, num) => {
    setShowModalSuggest(true);
    setmodalSuggestContent(content);
    setNum(num);
  };

  const showModalAnswerHandler = (content) => {
    setShowModalSuggest(false);
    setShowModalAnswer(true);
    setModalAnswerContent(content);
  };

  const closeModalSuggestsHandler = () => {
    setShowModalSuggest(false);
    setmodalSuggestContent("");
  };

  const closeModalAnswersHandler = () => {
    setShowModalAnswer(false);
    setModalAnswerContent("");
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>Đề thi không tồn tại</Message>
  ) : (
    <>
      <div className='exam-container detailed-answers'>
        <div className='header'>
          <h1 className='title'>Đáp án chi tiết đề: {data.exam._id}</h1>
        </div>
        <div className='exam-content'>
          <div className='question-section sidebar'>
            {Object.keys(data.exam.parts).map((partKey) => (
              <div key={partKey}>
                <p className='questionType'>
                  {data?.exam?.parts[partKey]?.questionType}
                </p>
                {data?.exam?.parts?.[partKey]?.passage && (
                  <p>{data?.exam?.parts?.[partKey]?.passage}</p>
                )}
                {data?.exam?.parts?.[partKey]?.passages &&
                  data?.exam?.parts?.[partKey]?.passages.map((passage) => (
                    <p>{passage}</p>
                  ))}
                {renderQuestions(data?.exam?.parts?.[partKey]?.questions)}
              </div>
            ))}
          </div>
          <div className='sidebar'>
            {[...Array(50).keys()].map((num) => (
              <Row key={num} className='question-item'>
                <Col>{num + 1}</Col>

                <Col>
                  {data.userAnswers?.[num] !== undefined &&
                  data.userAnswers?.[num] !== null ? (
                    <Button
                      variant={
                        data.userAnswers?.[num] ===
                        correctAnswers[num]?.correctOption
                          ? "success"
                          : "danger"
                      }
                      onClick={() =>
                        showModalSuggestHandler(
                          `${correctAnswers[num]?.suggestion}`,
                          num
                        )
                      }
                    >
                      {options[data.userAnswers?.[num]]}
                    </Button>
                  ) : (
                    <Button
                      variant='secondary'
                      onClick={() =>
                        showModalSuggestHandler(
                          `${correctAnswers[num]?.suggestion}`,
                          num
                        )
                      }
                    >
                      {options[correctAnswers[num]?.correctOption]}
                    </Button>
                  )}
                </Col>
              </Row>
            ))}
          </div>
        </div>
      </div>
      <Modal
        size='lg'
        centered
        show={showModalSuggest}
        onHide={closeModalSuggestsHandler}
      >
        <Modal.Header>
          <Modal.Title>
            Gợi ý câu{" "}
            {(function () {
              let newNum = num;
              return ++newNum;
            })()}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalSuggestContent}</Modal.Body>
        <Modal.Footer>
          <Button
            variant='secondary'
            style={{ backgroundColor: "#5d63c5" }}
            onClick={() =>
              showModalAnswerHandler(`Đáp án đúng là ${options[correctAnswers[num]?.correctOption]}.
                                ${correctAnswers[num]?.answerDetail}`)
            }
          >
            Xem đáp án chi tiết
          </Button>

          <Button variant='secondary' onClick={closeModalSuggestsHandler}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        size='lg'
        centered
        show={showModalAnswer}
        onHide={closeModalAnswersHandler}
      >
        <Modal.Header>
          <Modal.Title>
            Giải thích chi tiết câu{" "}
            {(function () {
              let newNum = num;
              return ++newNum;
            })()}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalAnswerContent}</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={closeModalAnswersHandler}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DetailedAnswersScreen;
