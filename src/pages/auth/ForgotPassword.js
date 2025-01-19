
import React, { useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import logo from "../../assets/auth/icon.png";
import logo6 from "../../assets/auth/logo6.png";
import logo7 from "../../assets/auth/logo7.png";
import { forgotPasswordAction } from "../../store/authSlice"; // Should be loginAction for login
function ForgotPassword() {

    const [formData, setFormData] = useState({
        email: "",
    });
    const [error, setError] = useState('');
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.email) {
            setError('Please fill in both email and password.');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Please enter a valid email address.');
            return;
        }
        setError('');

        dispatch(forgotPasswordAction(formData));

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

                    <h2 className="fw-bold text-center">Forgot Password</h2>
                    <p className="text-center fs">
                        We'll we email you the link, So you can reset your password
                    </p>

                    <Form onSubmit={handleSubmit}>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
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


                        <Button
                            variant="primary"
                            style={{ backgroundColor: "#420394" }}
                            className="w-100 py-3 mt-3"
                            type="submit"
                        >
                       <div className='fw-bold'>
                                Reset Password
                            </div>
                        </Button>
                        <div className="mt-2 text-center">
                            or{" "}
                            <Link to="/auth/register" className="" style={{ color: "#420394" }}>
                                Log In
                            </Link>
                        </div>
                    </Form>
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

export default ForgotPassword;
