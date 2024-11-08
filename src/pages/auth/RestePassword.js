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
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/auth/icon.png";
import logo6 from "../../assets/auth/logo6.png";
import logo7 from "../../assets/auth/logo7.png";
import { resetPasswordAction } from "../../store/authSlice";

function RestePassword() {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [isConfirmPasswordBlurred, setIsConfirmPasswordBlurred] =
    useState(false);
  const [passwordIsMatch, setPasswordIsMatch] = useState(true);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading,status } = useSelector(
    (state) => state.auth
  );
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const code = queryParams.get("code");
  console.log(code, "code");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!passwordIsMatch) return;
    setError("");
    const encryptedPassword = CryptoJS.AES.encrypt(
      formData.password,
      process.env.REACT_APP_SECRET_KEY
    ).toString();
    const encryptedconfirmPassword = CryptoJS.AES.encrypt(
      formData.confirmPassword,
      process.env.REACT_APP_SECRET_KEY
    ).toString();

    const encryptedFormData = {
      password: encryptedPassword,
      confirmPassword: encryptedconfirmPassword,
      token: code,
    };

    dispatch(resetPasswordAction(encryptedFormData));

    setFormData({ confirmPassword: "", password: "" });
  };

  useEffect(() => {
    if (status === "ok") {
      navigate("/auth/login");
    }
  }, [status,navigate]);
  useEffect(() => {
    if (!code) {
      navigate("/");
    }
  }, [code,navigate]);
  const handleConfirmPasswordBlur = () => {
    setIsConfirmPasswordBlurred(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };

    setFormData(updatedFormData);

    // Check if passwords match
    if (updatedFormData.password && updatedFormData.confirmPassword) {
      setPasswordIsMatch(
        updatedFormData.password === updatedFormData.confirmPassword
      );
    } else {
      setPasswordIsMatch(false);
    }
  };

  const features = [
    {
      img: logo6,
      title: "State-of-the-Art Accuracy",
      description:
        "Employs cutting-edge classification algorithms for unparalleled precision in data extraction and categorization.",
    },
    {
      img: logo7,
      title: "Aligned with IAB Guidelines",
      description:
        "Utilizes the IAB’s standards to guarantee accuracy and consistency in data classification and handling.",
    },
    {
      img: logo7,
      title: "Market-Leading Completeness",
      description:
        "Extract logos, find competitors or similar domains, classify into 385+ categories, and access a wide array of additional features.",
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

          <h3 className="fw-bold text-center">Reset Password</h3>

          <Form onSubmit={handleSubmit}>
            {error && <Alert variant="danger">{error}</Alert>}

            <InputGroup className="mb-3">
              <Form.Control
                type="password"
                placeholder="New Password"
                className="py-2 border-1 border-black"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </InputGroup>

            <InputGroup
              className={`mb-3 ${
                !passwordIsMatch && isConfirmPasswordBlurred ? "shake" : ""
              }`}
            >
              <Form.Control
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className={`py-2 ${
                  !passwordIsMatch && isConfirmPasswordBlurred
                    ? "is-invalid"
                    : ""
                }`}
                onBlur={handleConfirmPasswordBlur}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </InputGroup>

            {isConfirmPasswordBlurred && !passwordIsMatch && (
              <Alert variant="danger" className="mb-3">
                Passwords do not match!
              </Alert>
            )}

            <Button
              variant="primary"
              style={{ backgroundColor: "#420394" }}
              className="w-100 py-3 mt-3"
              type="submit"
              disabled={!passwordIsMatch || loading}
            >
              {loading ? <div className="spinner-border" /> : "Submit"}
            </Button>
          </Form>
        </Col>

        <Col md={7} className="ms-auto mt-5">
          <h6 className="mt-5 mb-4">
            All-in-one domain data source. Get Website Logos, Company Data,
            Categorization, and much more from a URL or Email.
          </h6>

          {features.map((item, index) => (
            <div
              key={index}
              className="d-flex justify-content-start align-items-center mb-3"
            >
              <img
                src={item.img}
                alt={item.title}
                style={{ width: "30px", objectFit: "contain" }}
              />
              <p className="mb-0 ms-3" style={{ fontSize: "14px" }}>
                <strong>{item.title}:</strong> {item.description}
              </p>
            </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
}

export default RestePassword;
