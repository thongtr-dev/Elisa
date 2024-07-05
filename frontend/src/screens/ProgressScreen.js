import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCreateExamMutation } from "../slices/examsApiSlice";
import { Row, Col, Button, ProgressBar } from "react-bootstrap";

const ProgressScreen = () => {
  const navigate = useNavigate();
  const [createExam, { isLoading }] = useCreateExamMutation();
  const [errMsg, setErrMsg] = useState("");
  const [isError, setIsError] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    generateExam();
  }, []);

  useEffect(() => {
    if (isLoading) {
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
  }, [isLoading]);

  const generateExam = async () => {
    try {
      const { examId } = await createExam().unwrap();
      navigate(`/take-exam/${examId}`);
      toast.success("Tạo đề thành công!");
    } catch (error) {
      setErrMsg(
        "Đề này lỗi quá nhiều nên giáo viên đã thu hồi. Bạn hãy thử tạo đề mới nhé."
      );
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
    <Row className='mt-5'>
      <Col className='text-center'>
        <h2 className='subtitle'>Bắt đầu phát đề!</h2>
      </Col>

      {isLoading && (
        <>
          <ProgressBar animated now={progress} label={`${progress}%`} />
          <p className='mt-3'>Đang phát đề...</p>
        </>
      )}

      {isError && (
        <>
          <p className='text-danger text-center' style={{ fontSize: "18px" }}>
            {errMsg}
          </p>
          <Col className='text-center'>
            <Button className='btn-start' onClick={clickHandler}>
              Tạo lại đề mới
            </Button>
          </Col>
        </>
      )}
    </Row>
  );
};

export default ProgressScreen;
