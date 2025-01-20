import CryptoJS from "crypto-js";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/auth/icon.png";
import logo1 from "../../assets/auth/logo1.png";
import logo2 from "../../assets/auth/logo2.png";
import logo3 from "../../assets/auth/logo3.png";
import logo4 from "../../assets/auth/logo4.png";
import logo6 from "../../assets/auth/logo6.png";
import { registerAction } from "../../store/authSlice";
import ReCAPTCHA from "react-google-recaptcha";

const data = [
  { img: logo1, title: "Smart Categorization Technology" },
  { img: logo2, title: "Extract logos on the ﬂy" },
  { img: logo3, title: "Social Media Links Scraper" },
  { img: logo4, title: "Ranked Domains Recognition" },
  { img: logo6, title: "Find Competitors or Similar Domains" },
];

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmpassword: "",
  });
  const [captchaValue, setCaptchaValue] = useState(null); 
  const [passwordIsMatch, setPasswordIsMatch] = useState(true);
  const [isConfirmPasswordBlurred, setIsConfirmPasswordBlurred] =
    useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const recaptchaRef = React.createRef();

  const { isAuthenticated } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const onCaptchaChange = (value) => {
    setCaptchaValue(value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };

    setFormData(updatedFormData);

    if (updatedFormData.password && updatedFormData.confirmpassword) {
      setPasswordIsMatch(
        updatedFormData.password === updatedFormData.confirmpassword
      );
    } else {
      setPasswordIsMatch(false);
    }
  };

  const handleConfirmPasswordBlur = () => {
    setIsConfirmPasswordBlurred(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!passwordIsMatch || !captchaValue) return; 

    const encryptedPassword = CryptoJS.AES.encrypt(
      formData.password,
      process.env.REACT_APP_SECRET_KEY
    ).toString();
    const encryptedFormData = {
      email: formData.email,
      password: encryptedPassword,
      name: formData.name,
    };
    dispatch(registerAction(encryptedFormData)).then(() => {
      navigate("/dashboard");
    });
  };

  return (
    <Container className="vh-100 d-flex align-items-center">
      <Row className="w-100">
        <Col md={6} className="text-start">
          <div className="d-flex flex-column align-items-start">
            <img src={logo} alt="ValidX Logo" className="mb-4" />
            <h2 className="fw-bold">ValidX</h2>
            <p className="mt-4 fw-medium">Get started with your account</p>
            <p>
              All-in-one domain data source. Get Website Logos, Company Data,
              Categorization, and much more from a URL or Email.
            </p>

            <Form className="w-100" onSubmit={handleSubmit} autoComplete="off">
              <InputGroup className="mb-3">
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="py-2 input-focus"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                />
              </InputGroup>

              <InputGroup className="mb-3">
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="E-Mail Address"
                  className="py-2 input-focus"
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
                  className="py-2 input-focus"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="new-password" 
                />
              </InputGroup>

              <InputGroup
                className={`mb-3 ${
                  !passwordIsMatch && isConfirmPasswordBlurred ? "shake" : ""
                }`}
              >
                <Form.Control
                  type="password"
                  name="confirmpassword"
                  placeholder="Confirm Password"
                  className={`py-2 input-focus ${
                    !passwordIsMatch && isConfirmPasswordBlurred
                      ? "is-invalid"
                      : ""
                  }`}
                  value={formData.confirmpassword}
                  onChange={handleChange}
                  onBlur={handleConfirmPasswordBlur}
                  required
                  autoComplete="new-password" 
                />
              </InputGroup>

              {isConfirmPasswordBlurred && !passwordIsMatch && (
                <Alert variant="danger" className="mb-3">
                  Passwords do not match!
                </Alert>
              )}

              <div className="mb-3">
                Already have an account?{" "}
                <Link
                  to="/auth/login"
                  className="text-decoration-none"
                  style={{ color: "#420394" }}
                >
                  Sign in
                </Link>
              </div>

              <div className="mb-3">
                <ReCAPTCHA
                  sitekey={process.env.REACT_APP_GOOGLE_CAPTCHA_KEY} 
                  ref={recaptchaRef}
                />
              </div>

              <Button
                variant="primary"
                type="submit"
                style={{ backgroundColor: "#420394" }}
                className="w-100 py-3"
                disabled={!passwordIsMatch || !captchaValue} 
              >
                Register
              </Button>
            </Form>
          </div>
        </Col>

        <Col
          md={6}
          className="d-flex flex-column justify-content-center align-items-center text-center"
        >
          <h5 style={{ marginTop: "180px" }}>
            The most accurate Content Classiﬁcation API
          </h5>
          <div className="text-start mt-1">
            {data.map((item, i) => (
              <div key={i} className="d-flex align-items-center mt-2">
                <img
                  src={item.img}
                  alt={item.title}
                  className="me-2"
                  style={{ width: "25px" }}
                />
                <p className="mb-0">{item.title}</p>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
