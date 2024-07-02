import { useNavigate, useParams } from "react-router-dom";
import { useGetExamScoreQuery } from "../slices/takeExamApiSlice";
import Message from "../components/Message";
import Loader from "../components/Loader";
import "./styles/resultScreen.css";

const ResultScreen = () => {
  const navigate = useNavigate();
  const { id: takenId } = useParams();
  const { data, isLoading, error } = useGetExamScoreQuery(takenId);

  const clickHandler = (e) => {
    e.preventDefault();
    navigate(`/result/${takenId}/details`);
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">
      {error?.status} {JSON.stringify(error?.data)}
    </Message>
  ) : (
    <div className="result-wrapper">
      <div className="result-container">
        <img src="/trophy.png" alt="trophy" className="result-image" />
        <div className="result-content">
          <h1 className="result-header">Chúc mừng bạn đã hoàn thành bài thi!</h1>
          <div className="result-details">
            <p>
              <span className="icon">🏆</span> Tổng số câu hỏi: {data.totalQuestions}
            </p>
            <p>
              <span className="icon">✅</span> Số câu đúng: {data.rightAnswersCount}
            </p>
            <p>
              <span className="icon">❌</span> Số câu sai: {data.wrongAnswersCount}
            </p>
          </div>
          <button onClick={clickHandler} className="result-button">
            Xem đáp án chi tiết
          </button>
        </div>
        <div className="balloon-container">
          <img src="/balloon.png" alt="Balloon" className="balloon" />
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;
