import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
//import FormContainer from "../components/FormContainer.js";
import Loader from "../components/Loader";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import "./styles/logintrue.css";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/main";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    //<FormContainer>
<<<<<<< HEAD
    <div className='login-wrapper'>
      <div className='login-container'>
        <div className='login-header'>
=======
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-header">
>>>>>>> 40414784b14e236386caf1f76fe349b24f3125a2
          <h1>Đăng nhập ngay!!</h1>
          <p>Chào mừng bạn quay trở lại 👋</p>
        </div>
        <Form onSubmit={submitHandler}>
<<<<<<< HEAD
          <Form.Group controlId='formEmail'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='Nhập địa chỉ Email của bạn'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='custom-placeholder'
            />
          </Form.Group>
          <Form.Group controlId='formPassword'>
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control
              type='password'
              placeholder='Nhập mật khẩu của bạn'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='custom-placeholder'
            />
          </Form.Group>

          <div className='d-flex justify-content-between align-items-center forgot-password'>
            <Form.Check type='checkbox' label='Ghi nhớ mật khẩu' />
            <a href='#forgot-password'>Quên mật khẩu?</a>
          </div>

          <Button variant='primary' type='submit' className='btn-login'>
=======
          <Form.Group controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Nhập địa chỉ Email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="custom-placeholder"
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control
              type="password"
              placeholder="Nhập mật khẩu của bạn"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="custom-placeholder"
            />
          </Form.Group>

          <div className="d-flex justify-content-between align-items-center forgot-password">
            <Form.Check type="checkbox" label="Ghi nhớ mật khẩu" />
            <a href="#forgot-password">Quên mật khẩu?</a>
          </div>

          <Button variant="primary" type="submit" className="btn-login">
>>>>>>> 40414784b14e236386caf1f76fe349b24f3125a2
            Đăng Nhập
          </Button>

          {isLoading && <Loader />}

<<<<<<< HEAD
          <Row className='py-3'>
            <Col className='register-link'>
              Nếu bạn chưa có tài khoản? <Link to='/register'>Đăng ký</Link>
=======
          <Row className="py-3">
            <Col className="register-link">
              Nếu bạn chưa có tài khoản? <Link to="/register">Đăng ký</Link>
>>>>>>> 40414784b14e236386caf1f76fe349b24f3125a2
            </Col>
          </Row>
        </Form>
      </div>
<<<<<<< HEAD
      <div className='image-container'>
        <img src='/login-image.png' alt='Login Illustration' />
=======
      <div className="image-container">
        <img src="/login-image.png" alt="Login Illustration" />
>>>>>>> 40414784b14e236386caf1f76fe349b24f3125a2
      </div>
    </div>
  );
};

export default LoginScreen;