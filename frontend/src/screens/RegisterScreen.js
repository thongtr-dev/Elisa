import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import "./styles/registerScreen.css";
import img_regis from "../asset/img-register.png";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

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
    if (password !== confirmPassword) {
      toast.error("Mật khẩu không khớp");
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    }
  };

  return (
    <div className='register-wrapper'>
      <div className='register-container'>
        <div className='register-header'>
          <h1>Đăng Ký Ngay!!</h1>
        </div>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label className='form-label'>Nhập Tên</Form.Label>
            <Form.Control
              className='custom-placeholder'
              type='text'
              placeholder='Nhập tên'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label className='form-label'>Email</Form.Label>
            <Form.Control
              className='custom-placeholder'
              type='email'
              placeholder='Nhập email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label className='form-label'>Mật khẩu</Form.Label>
            <Form.Control
              className='custom-placeholder'
              type='password'
              placeholder='Nhập mật khẩu'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='confirmPassword'>
            <Form.Label className='form-label'>Xác nhận mật khẩu</Form.Label>
            <Form.Control
              className='custom-placeholder'
              type='password'
              placeholder='Nhập lại mật khẩu'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <Button
            type='submit'
            variant='primary'
            className='btn-register'
            disabled={isLoading}
          >
            Đăng ký
          </Button>

          {isLoading && <Loader />}

          <Row className='py-3'>
            <Col className='register-link'>
              Đã có tài khoản?{" "}
              <Link to={redirect ? `/?redirect=${redirect}` : "/"}>
                Đăng nhập
              </Link>
            </Col>
          </Row>
        </Form>
      </div>
      <div className='image-container'>
        <img src={img_regis} alt='Register' />
      </div>
    </div>
  );
};

export default RegisterScreen;
