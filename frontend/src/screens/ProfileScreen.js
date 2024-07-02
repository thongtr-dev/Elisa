import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useUpdateProfileMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

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
    <Row
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Col
        style={{
          maxWidth: "500px",
          padding: "50px",
          backgroundColor: "#fff",
          borderBottom: "1px solid #dee2e6",
          borderRadius: "10px",
        }}
      >
        <h2 style={{ fontWeight: 700 }}>Sửa thông tin cá nhân</h2>
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
    </Row>
  );
};

export default ProfileScreen;
