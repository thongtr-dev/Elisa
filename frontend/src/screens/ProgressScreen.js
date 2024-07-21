import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCreateExamMutation } from "../slices/examsApiSlice";
import { Row, Col, Button, ProgressBar } from "react-bootstrap";

const ProgressScreen = () => {
  const navigate = useNavigate();
  const [createExam, { isLoading, error }] = useCreateExamMutation();
  const [isError, setIsError] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    generateExam();
  }, []);

  useEffect(() => {
    let interval;
    if (isLoading) {
      interval = setInterval(() => {
        setProgress((oldProgress) => {
          const newProgress = oldProgress + 2;
          if (newProgress >= 80 || error) {
            clearInterval(interval);
            setIsError(true);
            toast.error(
              "Đề thi này gặp một số trục trặc. Bạn hãy thử tạo đề thi mới."
            );
          }
          return newProgress;
        });
      }, 2000);
    }

    return () => clearInterval(interval);
  }, [isLoading, error]);

  const generateExam = async () => {
    try {
      const { examId } = await createExam().unwrap();
      navigate(`/take-exam/${examId}`);
      toast.success("Tạo đề thi thành công!");
    } catch (error) {
      toast.error(
        "Đề thi này gặp một số trục trặc. Bạn hãy thử tạo đề thi mới."
      );
      console.error(error?.data?.message);
      setIsError(true);
    }
  };

  const clickHandler = (e) => {
    e.preventDefault();
    setIsError(false);
    generateExam();
  };

  return (
    <div className='progress-screen-container'>
      <Row className='mt-5'>
        <Col className='text-center'>
          <h2 className='subtitle'>BẮT ĐẦU TẠO ĐỀ THI! </h2>
        </Col>

        {isLoading && (
          <>
            <ProgressBar
              animated
              now={progress}
              label={`${progress}% Complete`}
              className='custom-progress-bar'
            />
            <p className='mt-3'>Đang tạo đề...</p>
          </>
        )}

        {isError && (
          <Col className='text-center'>
            <Button className='btn-start' onClick={clickHandler}>
              Tạo đề thi khác
            </Button>
          </Col>
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
