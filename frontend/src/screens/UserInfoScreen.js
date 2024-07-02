import { useNavigate, useParams } from "react-router-dom";
import { useGetMyTakenExamsQuery } from "../slices/takeExamApiSlice";
import { Button } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import "./styles/userInfoScreen.css"

const UserInfoScreen = () => {
    const navigate = useNavigate();

    const { data, isLoading, error } = useGetMyTakenExamsQuery();

    const formatDateTime = (isoString) => {
        const date = new Date(isoString);
        const formattedDate = date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
        const formattedTime = date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
        return `${formattedDate} ${formattedTime}`;
    };

    const reTakeHandler = async (examId, e) => {
        e.preventDefault();
        navigate(`/take-exam/${examId}`);
    };

    const reViewHandler = async (takenId, e) => {
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
            <h1>CHI TIẾT</h1>
            <ul>
                <li className="list-item">
                    <span className="column">Đề</span>
                    <span className="column">Ngày</span>
                    <span className="column">Điểm</span>
                    <span className="column">Đúng</span>
                    <span className="column">Sai</span>
                </li>
                {data.map((record, i) => (
                    <li key={record.examId} className="list-item">
                        <span className="column">{i + 1}</span>
                        <span className="column">{formatDateTime(record.submitDate)}</span>
                        <span className="column">{record.score.toFixed(2)}</span>
                        <span className="column">{record.rightAnswersCount}</span>
                        <span className="column">{record.wrongAnswersCount}</span>
                        <span className="column">{<Button onClick={reTakeHandler.bind(null, record.examId)}>Làm lại</Button>}</span>
                        <span className="column">{<Button onClick={reViewHandler.bind(null, record._id)}>Xem lại</Button>}</span>
                    </li>
                ))}
            </ul>

        </>
    );




};

export default UserInfoScreen;
