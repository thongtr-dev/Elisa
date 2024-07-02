import { useNavigate } from "react-router-dom";
import { useGetMyTakenExamsQuery } from "../slices/takeExamApiSlice";
import { Button } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import "./styles/userInfoScreen.css";

const UserInfoScreen = () => {
    const navigate = useNavigate();
    const { data, isLoading, error } = useGetMyTakenExamsQuery();

    const formatDateTime = (isoString) => {
        const date = new Date(isoString);
        const formattedDate = date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
        const formattedTime = date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
        return `${formattedDate} ${formattedTime}`;
    };

    const reTakeHandler = (examId, e) => {
        e.preventDefault();
        navigate(`/take-exam/${examId}`);
    };

    const reViewHandler = (takenId, e) => {
        e.preventDefault();
        navigate(`/result/${takenId}/details`);
    };

    return isLoading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>
            {error?.status} {JSON.stringify(error?.data)}
        </Message>
    ) : (
        <>
            <div className="header-container">
                <h1 className="header-text">CHI TIẾT LỊCH SỬ LÀM ĐỀ THI</h1>
            </div>
            <div className="list-container">
                <ul>
                    <li className="list-item">
                        <span className="column">Đề thi</span>
                        <span className="column">Ngày</span>
                        <span className="column">Điểm</span>
                        <span className="column">Đúng</span>
                        <span className="column">Sai</span>
                    </li>
                    {data.map((record, i) => (
                        <li key={record.examId} className="list-item">
                            <span className="column1">{i + 1}</span>
                            <span className="column1">{formatDateTime(record.submitDate)}</span>
                            <span className="column1">{record.score.toFixed(1)}</span>
                            <span className="column1">{record.rightAnswersCount}</span>
                            <span className="column1">{record.wrongAnswersCount}</span>
                            <span className="column1"><Button className="custom-button" onClick={reTakeHandler.bind(null, record.examId)}>Làm lại</Button></span>
                            <span className="column1"><Button className="custom-button" onClick={reViewHandler.bind(null, record._id)}>Xem lại</Button></span>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default UserInfoScreen;
