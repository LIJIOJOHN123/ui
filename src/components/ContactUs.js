import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Footer from "./Footer";
import NavBar from "./NavBar";

const Body = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    
    secondName: "",
    email: "",
    phone: "",
    company: "",
    city: "",
  });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div className=" container">
      <div className="m-5 w-100">
        <NavBar />
        <div className="mt-3 ">
          <h2
            style={{ backgroundColor: "#420394" }}
            className="py-4 text-center rounded text-white"
          >
            Contact Us
          </h2>
          <Row className="mt-4">
            <Col md={6}>
              <Form>
                <Form.Group className=" ">
                  <Form.Label className="fw-bold m-0">Name</Form.Label>
                  <div className="d-flex">
                    <Form.Control
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="me-2  border-black"
                      placeholder="First Name"
                    />
                    <Form.Control
                      type="text"
                      name="secondName"
                      className="me-2  border-black"
                      value={formData.secondName}
                      onChange={handleInputChange}
                      placeholder="Last Name"
                    />
                  </div>
                </Form.Group>
                <Form.Group className="mt-2">
                  <Form.Label className="fw-bold  m-0">Email</Form.Label>
                  <div className="d-flex">
                    <Form.Control
                      type="text"
                      name="email"
                      value={formData.email}
                      className="  border-black"
                      onChange={handleInputChange}
                      placeholder="Email"
                    />
                  </div>
                </Form.Group>
                <Form.Group className="mt-2">
                  <Form.Label className="fw-bold m-0">Phone</Form.Label>
                  <div className="d-flex">
                    <Form.Control
                      type="number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="border-black"
                      placeholder="Phone number"
                    />
                  </div>
                </Form.Group>
                <Form.Group className="mt-2">
                  <Form.Label className="fw-bold  m-0">Company</Form.Label>
                  <div>
                    <Form.Control
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Company"
                      className="  border-black"
                    />
                  </div>
                </Form.Group>

                <Form.Group className="mt-2">
                  <Form.Label className="fw-bold  m-0">City</Form.Label>
                  <div>
                    <Form.Control
                      type="text"
                      name="company"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Company"
                      className="  border-black"
                    />
                  </div>
                </Form.Group>

                <div className=" d-flex justify-content-center">
                  <Button variant="primary" type="submit" className="mt-4 ">
                    Submit
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};
function ContactUs() {
  return (
    <>
      <Body />
      <Footer />
    </>
  );
}

export default ContactUs;
