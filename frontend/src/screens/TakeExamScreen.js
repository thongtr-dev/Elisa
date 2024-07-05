import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Row, Col, Button, Form, Modal } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import CountdownTimer from "../components/CountDownTimer";
import { toast } from "react-toastify";
import { useGetExamDetailsQuery } from "../slices/examsApiSlice";
import { useSubmitExamMutation } from "../slices/takeExamApiSlice";
import { saveTakingExam } from "../slices/authSlice";
import "./styles/takeExamScreen.css";

const TakeExamScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: examId } = useParams();
  const { data: examData, isLoading, error } = useGetExamDetailsQuery(examId);
  const [submitExam, { isLoading: examSubmitLoading }] =
    useSubmitExamMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const [userAnswers, setUserAnswers] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (
      !userInfo?.takingExam?.examId ||
      userInfo?.takingExam?.examId !== examId
    ) {
      dispatch(
        saveTakingExam({
          ...userInfo,
          takingExam: { examId, userAnswers: [], timeLeft: 3600 },
        })
      );
    } else if (userInfo?.takingExam?.examId === examId) {
      const savedUserAnswers = userInfo?.takingExam?.userAnswers;
      if (savedUserAnswers) {
        setUserAnswers(savedUserAnswers);
      }
    }
  }, [dispatch, userInfo, examId]);

  let questionNum = 0;

  const renderQuestions = (questions) =>
    questions.map((question) => (
      <div key={question?._id}>
        <span>
          <strong>Question {++questionNum}</strong>:{" "}
          <span dangerouslySetInnerHTML={{ __html: question?.question }}></span>
        </span>

        <ul className='options'>
          {question?.options?.map((option, i) => (
            <li dangerouslySetInnerHTML={{ __html: option }} key={i}></li>
          ))}
        </ul>
      </div>
    ));

  const changeAnswerHandler = (questionNum, option) => {
    const updatedAnswers = { ...userAnswers };
    updatedAnswers[questionNum] = option;
    setUserAnswers(updatedAnswers);

    dispatch(
      saveTakingExam({
        ...userInfo,
        takingExam: { ...userInfo?.takingExam, userAnswers: updatedAnswers },
      })
    );
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { takenId } = await submitExam({
        examId,
        submitDate: new Date(),
        userAnswers,
      }).unwrap();
      toast.success("Đã nộp bài thành công!");
      dispatch(saveTakingExam({ ...userInfo, takingExam: {} }));
      navigate(`/result/${takenId}`);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>
      {error?.status} {JSON.stringify(error?.data)}
    </Message>
  ) : (
    <>
      <div className='exam-container'>
        <Row className='header align-items-center'>
          <Col md={8}>
            <h1 className='title'>Mã đề {examData._id}</h1>
          </Col>
          <Col md={2} className='timer'>
            <span className='time'>
              {<CountdownTimer submitHandler={submitHandler} />}
            </span>
          </Col>
          <Col md={2} className='user-info'>
            <Button className='logout-btn' onClick={() => setShowModal(true)}>
              THOÁT
            </Button>
          </Col>
        </Row>
        <Row className='mt-3 flex-start align-items-center w-100'>
          <Col md={5}>
            <p>
              <i>
                Đề thi này giống đến{" "}
                <span
                  className={
                    examData.percentage >= 0 && examData.percentage <= 50
                      ? "text-danger"
                      : examData.percentage >= 51 && examData.percentage <= 79
                        ? "text-warning"
                        : "text-success"
                  }
                  style={{
                    padding: "5px",
                    backgroundColor: "white",
                    fontWeight: "bold",
                    fontSize: "18px",
                  }}
                >
                  {examData.percentage}%{" "}
                </span>
                so với cấu trúc đề thi THPTQG thật
              </i>
            </p>
          </Col>
          {examData.percentage >= 0 && examData.percentage <= 79 && (
            <Col md={4}>
              <Button as={Link} className='submit-btn' to='/progress'>
                Tạo đề thi khác
              </Button>
            </Col>
          )}
        </Row>
        <div className='exam-content'>
          <div className='question-section sidebar'>
            {Object.keys(examData?.parts).map((partKey) => (
              <div key={partKey}>
                <p className='questionType'>
                  {examData?.parts[partKey]?.questionType}
                </p>
                {examData?.parts?.[partKey]?.passage && (
                  <p>{examData?.parts?.[partKey]?.passage}</p>
                )}
                {examData?.parts?.[partKey]?.passages &&
                  examData?.parts?.[partKey]?.passages.map((passage) => (
                    <p>{passage}</p>
                  ))}
                {renderQuestions(examData?.parts?.[partKey]?.questions)}
              </div>
            ))}
          </div>
          <div className='sidebar'>
            <Form onSubmit={submitHandler}>
              {examSubmitLoading ? (
                <Loader />
              ) : (
                <>
                  {" "}
                  <button type='submit' className='submit-btn'>
                    NỘP BÀI
                  </button>
                  <p>
                    <i>* Kiểm tra kỹ trước khi nộp bài</i>
                  </p>
                </>
              )}
              {[...Array(50).keys()].map((num) => (
                <div key={num} className='question-item'>
                  <span>{num + 1}</span>
                  <div className='options'>
                    {["A", "B", "C", "D"].map((option, i) => (
                      <Form.Check
                        inline
                        label={option}
                        type='radio'
                        name={`question-${num}`}
                        key={i}
                        checked={userAnswers[num] === i}
                        onChange={() => changeAnswerHandler(num, i)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </Form>
          </div>
        </div>
      </div>
      <Modal
        size='md'
        centered
        className='confirm-dialog'
        show={showModal}
        onHide={() => setShowModal(false)}
      >
        <Modal.Header>
          <Modal.Title>Bạn có chắc chắn không tiếp tục làm bài?</Modal.Title>
        </Modal.Header>

        <Modal.Body>Bài làm của bạn vẫn sẽ được tính điểm.</Modal.Body>

        <Modal.Footer>
          <Row>
            <Col>
              <Button className='start-btn' onClick={() => setShowModal(false)}>
                Làm tiếp
              </Button>
            </Col>
            <Col>
              <Button variant='secondary' onClick={submitHandler}>
                Thoát
              </Button>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TakeExamScreen;
