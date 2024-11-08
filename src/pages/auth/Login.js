import { useGoogleLogin } from "@react-oauth/google";
import CryptoJS from "crypto-js";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/auth/icon.png";
import logo6 from "../../assets/auth/logo6.png";
import logo7 from "../../assets/auth/logo7.png";
import { googleOAuthLoginAction, loginAction } from "../../store/authSlice"; // Should be loginAction for login
import {
  getLocalStorage
} from "../../utils/LocalStorage";
function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);


  const tokenExist = getLocalStorage("authToken");
  useEffect(() => {
    if (tokenExist) {
      navigate("/dashboard");
    }
  }, [tokenExist]);

  const googleLogin = useGoogleLogin({
    onSuccess: async (res) => {
      try {
        dispatch(googleOAuthLoginAction(res.access_token));
      } catch (error) {
        console.log("Error during Google login:", error);
      }
    },
    onError: (error) => {
      console.log("Login failed:", error);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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

    setError(""); // Clear error before encrypting

    const encryptedPassword = CryptoJS.AES.encrypt(
      formData.password,
      process.env.REACT_APP_SECRET_KEY
    ).toString();

    const encryptedFormData = {
      ...formData,
      password: encryptedPassword,
    };

    dispatch(loginAction(encryptedFormData));
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

          <Form onSubmit={handleSubmit}>
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
            <Button
              variant="primary"
              style={{ backgroundColor: "#420394" }}
              className="w-100 py-3 mt-3"
              type="submit"
              disabled={loading}
            >
              {loading ? <div className="spinner-border" /> : <div>Log In</div>}
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

          <Button
            className="w-100 py-3 bg-white  border-black text-start "
            onClick={() => googleLogin()}
          >
            <div className="d-flex flex-row">
              <img
                alt="hi"
                width={25}
                className="bg-white mb-1"
                src="data:image/png;base64,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"
              />
              <h5 className="text-black mx-3 fw-normal">
                Continue with Google
              </h5>
            </div>
          </Button>
        </Col>

        <Col md={7} className="ms-auto mt-5">
          <h6 className="mt-5 mb-4">
            All-in-one domain data source. Get Website Logos, Company Data,
            Categorization and much more from a URL or Email.
          </h6>

          {data1.map((item, i) => (
            <div
              key={i}
              className="d-flex justify-content-start align-items-center mb-3"
            >
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
