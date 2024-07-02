import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetMyTakenExamsQuery } from "../slices/takeExamApiSlice";
import Message from "../components/Message";
import Loader from "../components/Loader";


const UserInfoScreen = () => {
const navigate = useNavigate();

const { userInfo } = useSelector((state) => state.auth);

const {takeExam, isLoading, error } = useGetMyTakenExamsQuery(userInfo._id);

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>
      {error?.status} {JSON.stringify(error?.takeExam)}
    </Message>
  ) : (
    <>
      <h1>CHI TIẾT {console.log(takeExam)}</h1>
      {/* <p>Số câu đúng: {takeExam.userId}</p>
      <p>Số câu sai: {takeExam.submitDate}</p> */}
    </>
  );




};

export default UserInfoScreen;
