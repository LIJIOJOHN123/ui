import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import CryptoJS from "crypto-js";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/auth/icon.png";
import logo6 from "../../assets/auth/logo6.png";
import logo7 from "../../assets/auth/logo7.png";
import { googleOAuthLoginAction, loginAction } from "../../store/authSlice";
import { getLocalStorage } from "../../utils/LocalStorage";
import ReCAPTCHA from "react-google-recaptcha";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [captchaValue, setCaptchaValue] = useState(null); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(getLocalStorage("user"));

  useEffect(() => {
    if (user && user.name) {
      navigate("/client-batch");
    }
  }, [user, navigate,]);

  const recaptchaRef = React.createRef();

  const handleLoginSuccess = (credentialResponse) => {
    const { credential } = credentialResponse;
    dispatch(googleOAuthLoginAction(credential)).then(() => {
      navigate("/client-batch");
    }).catch((err) => {
      setError("Google login failed. Please try again.");
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please fill in both email and password.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!captchaValue) {
      setError("Please verify the CAPTCHA.");
      return;
    }

    setError(""); 

    const encryptedPassword = CryptoJS.AES.encrypt(
      formData.password,
      process.env.REACT_APP_SECRET_KEY
    ).toString();

    const encryptedFormData = {
      ...formData,
      password: encryptedPassword,
    };

    dispatch(loginAction(encryptedFormData)).then(() => {
      navigate("/client-batch");
    }).catch((err) => {
      setError("Login failed. Please check your credentials.");
    });
  };

  const data1 = [
    {
      img: logo6,
      title: "State-of-the-Art Accuracy",
      des: "Employs cutting-edge classification algorithms for unparalleled precision in data extraction and categorization.",
    },
    {
      img: logo7,
      title: "Aligned with IAB Guidelines",
      des: "Utilizes the IAB’s standards to guarantee accuracy and consistency in data classification and handling.",
    },
    {
      img: logo7,
      title: "Market-Leading Completeness",
      des: "Extract logos, find competitors or similar domains, classify into 385+ categories, and access a wide array of additional features.",
    },
  ];

  return (
    <Container className="vh-100 d-flex align-items-center justify-content-center">
      <Row className="align-items-center">
        <Col md={4} className="me-5">
          <div className="text-center">
            <img
              src={logo}
              alt="ValidX Logo"
              className="mb-4"
              style={{ width: "75px" }}
            />
          </div>

          <h2 className="fw-bold text-center">Welcome</h2>
          <p className="text-center">
            Log in to ValidX AI to continue to your dashboard.
          </p>

          <Form onSubmit={handleSubmit} autoComplete="off">
            {error && <p style={{ color: "red" }}>{error}</p>}

            <InputGroup className="mb-3">
              <Form.Control
                type="text"
                placeholder="E-Mail Address"
                className="py-3 border-1 border-black"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                className="py-3 border-1 border-black"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="new-password"
              />
            </InputGroup>

            <div className="d-flex justify-content-between align-items-center">
              <Link
                to="/auth/forgot-password"
                className="text-decoration-none fw-semibold"
                style={{ color: "#420394" }}
              >
                Forgot password?
              </Link>
            </div>

            <ReCAPTCHA
              sitekey={process.env.REACT_APP_GOOGLE_CAPTCHA_KEY}
              ref={recaptchaRef}
              onChange={onCaptchaChange}
            />

            <Button
              variant="primary"
              style={{ backgroundColor: "#420394" }}
              className="w-100 py-3 mt-3"
              type="submit"
              formNoValidate
            >
              <div>Log In</div>
            </Button>

            <div className="mt-2 text-center">
              Don’t have an account?{" "}
              <Link
                to="/auth/register"
                className="text-decoration-none"
                style={{ color: "#420394" }}
              >
                Sign up
              </Link>
            </div>
          </Form>

          <div className="d-flex align-items-center my-2">
            <hr className="flex-grow-1" />
            <span className="mx-2 fw-bold">OR</span>
            <hr className="flex-grow-1" />
          </div>

          <h1 className="">
            <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
              <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={() => {
                  setError("Google login failed. Please try again.");
                }}
              />
            </GoogleOAuthProvider>
          </h1>
        </Col>

        <Col md={7} className="ms-auto mt-5">
          <h6 className="mt-5 mb-4">
            All-in-one domain data source. Get Website Logos, Company Data,
            Categorization and much more from a URL or Email.
          </h6>

          {data1.map((item, i) => (
            <div key={i} className="d-flex justify-content-start align-items-center mb-3">
              <img
                src={item.img}
                alt="Smart Categorization Technology"
                style={{ width: "30px", objectFit: "contain" }}
              />
              <p className="mb-0 ms-3" style={{ fontSize: "14px" }}>
                <span className="fw-bold">{item.title}: </span>
                {item.des}
              </p>
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
