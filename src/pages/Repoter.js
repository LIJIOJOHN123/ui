import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import NavBar from "../components/NavBar"; // Ensure this path is correct
import img1 from "../assets/Report/img1.png"; // Replace this with your actual image path
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const Report = () => {
  const [submited, setSubmited] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = () => {
    setSubmited(!submited); // Toggle the submitted state
    console.log(`Form submitted: ${!submited}`); // Optional: log the state
    // setTimeout(() => {
    //   navigate("/");
    // }, [2000]);
  };
  return (
    <>
      {/* NavBar at the top */}
      <div
        id="/"
        className="pb-sm-3"
        style={{
          display: "flex",
          background: "linear-gradient(to bottom, #420394, #000000)",
          paddingBottom: "50px", // Padding below the NavBar to create spacing
        }}
      >
        <div
          className="container mt-5"
          style={{ width: "90%", maxWidth: "1200px" }}
        >
          <NavBar />
        </div>
      </div>

      {/* Main Form Section */}
      <div
        className="d-flex justify-content-center align-items-center my-5 "
        style={
          {
            // Full height to center the form
          }
        }
      >
        <Container
          className="border border-danger rounded-5 p-4 "
          style={{
            maxWidth: "600px", // Restrict the form width
            backgroundColor: "white", // White background for the form
            textAlign: "center", // Center text inside the form
            backgroundColor: "#EEEFF5",
          }}
        >
          <div className="border border-3 bg-white  p-3 rounded-4 ">
            {/* Image */}
            <img
              src={img1}
              width={50}
              height={50}
              className="img-fluid mb-3"
              alt="Try it now"
            />

            {/* Heading */}
            <h5 className="fw-light">Try it now</h5>

            {/* Form Title */}
            <h3>Submit a Merchant</h3>
            <h3>Get an AI Risk Report</h3>

            {/* Description */}

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
                <p className="m-0"> We will contact your via email shortly</p>
              </div>
            ) : (
              <Form>
                {/* Merchant URL Input */}
                <Form.Group className="mb-3 text-start">
                  <Form.Label htmlFor="merchantUrl" className="fw-bold ">
                    Merchant’s URL (for the example report)
                  </Form.Label>
                  <Form.Control
                    id="merchantUrl"
                    type="url"
                    placeholder="www.chargebackZero.com"
                    required
                  />
                </Form.Group>

                {/* Email Input */}
                <Form.Group className="mb-3 text-start">
                  <Form.Label htmlFor="emailAddress" className="fw-bold">
                    Your Email Address
                  </Form.Label>
                  <Form.Control
                    id="emailAddress"
                    type="email"
                    placeholder="yourname@company.com"
                    required
                  />
                </Form.Group>

                {/* Submit Button */}
                <div className="text-end">
                  <Button
                    onClick={handleSubmit}
                    variant="dark"
                    type="submit"
                    className=""
                  >
                    Submit
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
