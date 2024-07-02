import { useNavigate, useParams } from "react-router-dom";
import { useGetMyTakenExamsQuery } from "../slices/takeExamApiSlice";
import Message from "../components/Message";
import Loader from "../components/Loader";


const UserInfoScreen = () => {
const navigate = useNavigate();

const {data, isLoading, error } = useGetMyTakenExamsQuery();

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>
      {error?.status} {JSON.stringify(error?.data)}
    </Message>
  ) : (
    <>
      <h1>CHI TIẾT {console.log(data.submitDate)}</h1>
      {/* <p>Số câu đúng: {takeExam.userId}</p>
      <p>Số câu sai: {takeExam.submitDate}</p> */}
    </>
  );




};

export default UserInfoScreen;
