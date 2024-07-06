import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useCreateExamMutation,
  useCreateExamFromMistakesMutation,
} from "../slices/examsApiSlice";
import { Row, Col, Button, ProgressBar } from "react-bootstrap";

const ProgressScreen = () => {
  const navigate = useNavigate();
  const [createExam, { isLoading }] = useCreateExamMutation();
  const [createExamFromMistakes, { isLoading: loadingCreateFromMistakes }] =
    useCreateExamFromMistakesMutation();
  const [errMsg, setErrMsg] = useState("");
  const [isError, setIsError] = useState(false);
  const [progress, setProgress] = useState(0);

  const { examIsRandom } = useSelector((state) => state.exam);

  useEffect(() => {
    if (examIsRandom) {
      generateExam(createExam);
    } else {
      generateExam(createExamFromMistakes);
    }
  }, [examIsRandom]);

  useEffect(() => {
    if (isLoading || loadingCreateFromMistakes) {
      const interval = setInterval(() => {
        setProgress((oldProgress) => {
          const newProgress = oldProgress + 2;
          if (newProgress >= 80) {
            clearInterval(interval);
            setIsError(true);
            setErrMsg(
              "Có vẻ như đề thi gặp một chút trục trặc. Bạn có muốn tạo lại đề mới không?"
            );
          }
          return newProgress;
        });
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isLoading, loadingCreateFromMistakes]);

  const generateExam = async (func) => {
    try {
      const { examId } = await func().unwrap();
      navigate(`/take-exam/${examId}`);
      toast.success("Tạo đề thi thành công!");
    } catch (error) {
      setErrMsg("Đề thi này chưa hoàn chỉnh. Bạn hãy tạo đề thi mới nhé.");
      setIsError(true);
    }
  };

  const clickHandler = (e) => {
    e.preventDefault();
    setIsError(false);
    setErrMsg("");
    generateExam();
  };

  return (
    <div className='progress-screen-container'>
      <Row className='mt-5'>
        <Col className='text-center'>
          <h2 className='subtitle'>BẮT ĐẦU TẠO ĐỀ THI! </h2>
        </Col>

        {(isLoading || loadingCreateFromMistakes) && (
          <>
            <ProgressBar
              animated
              now={progress}
              label={`${progress}% Complete`}
              className='custom-progress-bar'
            />
            <p className='mt-3'>Đang hiển thị...</p>
          </>
        )}

        {isError && (
          <>
            <p className='text-danger text-center' style={{ fontSize: "18px" }}>
              {errMsg}
            </p>
            <Col className='text-center'>
              <Button className='btn-start' onClick={clickHandler}>
                Tạo lại đề thi mới
              </Button>
            </Col>
          </>
        )}
      </Row>
      <Row className='mt-3'>
        <Col className='text-center'>
          <img
            src='/pro2.png'
            alt='Login Illustration'
            className='pro2-image'
          />
          <style>
            {`
              .progress-bar {
                transition: width 1s ease-in-out;
              }
              .custom-progress-bar .progress-bar {
                background-color: #FF1493 !important; 
              }
              .progress-bar span {
                color: black; 
                font-weight: bold;
              }
            `}
          </style>
        </Col>
      </Row>
    </div>
  );
};

export default ProgressScreen;
