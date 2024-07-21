import { useState, useEffect } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useUpdateProfileMutation } from "../slices/usersApiSlice";
import { useGetMyTakenExamsQuery } from "../slices/takeExamApiSlice";
import { setCredentials } from "../slices/authSlice";
import { formatDateTime } from "../utils/formatDateTime";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const { data, isLoading: loadingExam, error } = useGetMyTakenExamsQuery();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo, userInfo.name, userInfo.email]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success("Cập nhật thành công!");
      } catch (error) {
        toast.error(error?.data?.message);
      }
    }
  };

  return (
    <Row>
      <Col
        md={4}
        xs={12}
        style={{
          padding: "40px",
          backgroundColor: "#fff",
          borderBottom: "1px solid #dee2e6",
          borderRadius: "10px",
        }}
      >
        <h1 style={{ fontWeight: 700, fontSize: "2rem" }}>Sửa thông tin</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name' className='my-3'>
            <Form.Label>Tên</Form.Label>
            <Form.Control
              type='name'
              placeholder='Nhập tên'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='email' className='my-3'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='Nhập email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='password' className='my-3'>
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control
              type='password'
              placeholder='Nhập mật khẩu mới'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='confirmPassword' className='my-3'>
            <Form.Label>Nhập lại mật khẩu mới</Form.Label>
            <Form.Control
              type='password'
              placeholder='Nhập lại mật khẩu mới'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          {isLoading ? (
            <Loader />
          ) : (
            <Button
              type='submit'
              variant='primary'
              className='mt-2'
              style={{ backgroundColor: "#6c75d7", borderColor: "#6c75d7" }}
            >
              Cập nhật
            </Button>
          )}
        </Form>
      </Col>

      {loadingExam ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.status} {JSON.stringify(error?.data)}
        </Message>
      ) : (
        <Col md={8} xs={12}>
          <h2 style={{ fontWeight: 700 }}>Lịch sử làm đề</h2>
          <Table striped hover responsive className='table-sm p-2 mt-2'>
            <thead>
              <tr>
                <th>Mã đề</th>
                <th>Ngày</th>
                <th>Điểm</th>
                <th>Đúng</th>
                <th>Sai</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((record) => (
                <tr key={record.examId} className='list-item'>
                  <td>{"...".concat(record.examId.slice(-4))}</td>
                  <td>{formatDateTime(record.createdAt)}</td>
                  <td>{record.score.toFixed(1)}</td>
                  <td>{record.rightAnswersCount}</td>
                  <td>{record.wrongAnswersCount}</td>
                  <td>
                    <Button
                      as={Link}
                      to={`/take-exam/${record.examId}`}
                      style={{
                        backgroundColor: "#ff6b6b",
                        borderColor: "#ff6b6b",
                      }}
                    >
                      Làm lại
                    </Button>
                  </td>
                  <td>
                    <Button
                      as={Link}
                      to={`/result/${record._id}/details`}
                      style={{
                        backgroundColor: "#535dd0",
                        borderColor: "535dd0",
                      }}
                    >
                      Xem lại
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      )}
    </Row>
  );
};

export default ProfileScreen;
