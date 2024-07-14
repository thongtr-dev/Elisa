import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import { setExamIsRandom } from "../slices/examSlice";
import "./styles/homeScreen.css";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createRandom = (e) => {
    e.preventDefault();
    dispatch(setExamIsRandom(true));
    navigate("/progress");
  };

  const createFromMistakes = (e) => {
    e.preventDefault();
    dispatch(setExamIsRandom(false));
    navigate("/progress");
  };

  return (
    <Container className='home-screen-container'>
      <Row className='justify-content-center text-center'>
        <Col>
          <h2 className='subtitle'>Luyện đề thi Tiếng anh THPT Quốc Gia</h2>
        </Col>
      </Row>
      <Row className='justify-content-center text-center'>
        <Col>
          <h3 className='highlight'>With AI</h3>
        </Col>
      </Row>
      <Row className='justify-content-center text-center'>
        <Col>
          <Button className='btn-start' onClick={createRandom}>
            Tạo đề ngẫu nhiên
          </Button>
        </Col>
        <Col>
          <Button
            className='btn-start from-mistakes'
            style={{ whiteSpace: "nowrap" }}
            onClick={createFromMistakes}
          >
            Tạo đề cá nhân hóa
          </Button>
        </Col>
      </Row>
      <Row className='justify-content-center'>
        <Col className='image-col'>
          <img
            src='/Giaodientruockhilambai.png'
            alt='Illustration'
            className='illustration'
          />
        </Col>
      </Row>
    </Container>
  );
};

export default HomeScreen;
