import React, { useEffect, useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import img1 from "../assets/Report/img1.png";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import { useLocation, useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
const Report = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const submittedUrl = searchParams.get("submittedUrl");

  const navigate = useNavigate();
  const [submited, setSubmited] = useState(false);
  const [formData, setFormData] = useState({
    merchantUrl: "",
    emailAddress: "",
  });
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (submittedUrl) {
      setFormData((prevData) => ({
        ...prevData,
        merchantUrl: submittedUrl,
      }));
    }
  }, [submittedUrl]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  console.log(process.env.REACT_APP_TEMPLATE_ID, "ServiceId");


  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    emailjs
      .send(
        "service_oydgqi1", // Your Service ID
        "template_ova20rc", // Your Template ID
        {
          message: formData.merchantUrl,
          from_email: formData.emailAddress, // The user's email
        },
        "nCO3AcICvW-hhC20K" // Your Public Key
      )
      .then(
        (response) => {
          console.log(response);
          setSubmited(true);
          setTimeout(() => {
            navigate(-1);
          }, 3000);
        },
        (error) => {
          console.error("Failed to send email. Error:", error);
          Alert("Failed to send email. Please try again.");
        }
      );

    setLoading(false)
  };

  return (
    <>
      <div
        id="/"
        className="pb-sm-3"
        style={{
          display: "flex",
          background: "linear-gradient(to bottom, #420394, #000000)",
          paddingBottom: "50px",
        }}
      >
        <div
          className="container mt-5"
          style={{ width: "90%", maxWidth: "1200px" }}
        >
          <NavBar />
        </div>
      </div>

      <div className="d-flex justify-content-center align-items-center my-5 ">
        <Container
          className="border border-danger rounded-5 p-4 "
          style={{
            maxWidth: "600px",
            textAlign: "center",
            backgroundColor: "#EEEFF5",
          }}
        >
          <div className="border border-3 bg-white p-3 rounded-4">
            <img
              src={img1}
              width={50}
              height={50}
              className="img-fluid mb-3"
              alt="Try it now"
            />

            <h5 className="fw-light">Try it now</h5>

            <h3>Submit a Merchant</h3>
            <h3>Get an AI Risk Report</h3>

            {submited ? (
              <p>
                Check your merchants for card scheme violations and fraudulent
                activities.{" "}
              </p>
            ) : (
              <p>
                Check your merchants for card scheme violations and fraudulent
                activities.
              </p>
            )}

            {submited ? (
              <div
                style={{ backgroundColor: "#EEEFF5" }}
                className="mx-5 rounded-3 border border-2 py-3"
              >
                <p className="m-0">Thank you!</p>
                <p className="m-0">Your submission has been received!</p>
                <p className="m-0"> We will contact you via email shortly.</p>
              </div>
            ) : (
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3 text-start">
                  <Form.Label htmlFor="merchantUrl" className="fw-bold">
                    Merchant’s URL (for the example report)
                  </Form.Label>
                  <Form.Control
                    id="merchantUrl"
                    type="url"
                    placeholder="www.chargebackZero.com"
                    value={formData.merchantUrl}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3 text-start">
                  <Form.Label htmlFor="emailAddress" className="fw-bold">
                    Your Email Address
                  </Form.Label>
                  <Form.Control
                    id="emailAddress"
                    type="email"
                    placeholder="yourname@company.com"
                    value={formData.emailAddress}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <div className="text-end">
                  <Button variant="dark" type="submit">
                    {loading ? "Loading..." : "Submit"}
                  </Button>
                </div>
              </Form>
            )}
          </div>
        </Container>
      </div>
      <Footer />
    </>
  );
};

export default Report;
