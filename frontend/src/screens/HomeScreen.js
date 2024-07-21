import { Link } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import "./styles/homeScreen.css";

const HomeScreen = () => (
  <Container>
    <Col xs={12}>
      <h2 className='subtitle text-center'>
        Luyện đề thi Tiếng anh THPT Quốc Gia
      </h2>
    </Col>
    <Col xs={12}>
      <h3 className='highlight text-center'>With AI</h3>
    </Col>
    <Row className='justify-content-center'>
      <Button
        as={Link}
        className='btn-start'
        to='/progress'
        style={{ maxWidth: "200px" }}
      >
        Tạo đề thi
      </Button>
    </Row>

    <Row className='justify-content-center'>
      <img
        src='/Giaodientruockhilambai.png'
        alt='Illustration'
        style={{ maxWidth: "800px" }}
      />
    </Row>
  </Container>
);

export default HomeScreen;
