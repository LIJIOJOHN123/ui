import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import headerSec from "../../assets/Marketing/headerSec.png";
import logo1 from "../../assets/Marketing/logo1.png";
import logo2 from "../../assets/Marketing/logo2.png";
import bodySec from "../../assets/bodySec.png";
import Features from "../../components/Features";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import Pricing from "../../components/Pricing";
import SEO from "../../components/SEO";

function Header() {
  const [url, setUrl] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/report?submittedUrl=${encodeURIComponent(url)}`);
  };
  const gradientTextStyle = {
    fontWeight: "bold",
    background: "linear-gradient(90deg, white 0%, pink 50%, gold 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    MozBackgroundClip: "text",
    MozTextFillColor: "transparent",
    display: "inline-block",
  };

  return (
    <div
      id="/"
      className="  container-fluid"
      style={{
        background: "linear-gradient(to bottom, #420394, #000000)",
        height: "600px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        className="m-5 position-absolute "
        style={{ width: "90%", maxWidth: "1200px" }}
      >
        <NavBar />
        <Row className="w-100 position-absolute" style={{ top: "80px" }}>
          <Col md={6}>
            <div
              className="d-flex flex-column pt-5"
              style={{ height: "350px", width: "100%" }}
            >
              <h2
                className="position-relative d-inline-block"
                style={{ fontSize: "30px", ...gradientTextStyle }}
              >
                Marketing
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 10"
                  style={{
                    position: "absolute",
                    bottom: "-25px",
                    left: "30%",
                    transform: "translateX(-50%)",
                    width: "60%",
                    height: "auto",
                  }}
                >
                  <defs>
                    <linearGradient
                      id="gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop
                        offset="0%"
                        style={{ stopColor: "white", stopOpacity: 1 }}
                      />
                      <stop
                        offset="50%"
                        style={{ stopColor: "pink", stopOpacity: 1 }}
                      />
                      <stop
                        offset="100%"
                        style={{ stopColor: "gold", stopOpacity: 1 }}
                      />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 0 5 H 50 Q 75 5, 100 8"
                    stroke="url(#gradient)"
                    strokeWidth="2"
                    fill="transparent"
                    strokeLinecap="round"
                  />
                </svg>
              </h2>

              <p
                className="mt-5 fw-lighter text-white lead w-100"
                style={{ width: "539px", fontSize: "22px" }}
              >
                Lead Generation, Market Segmentation, and Market Research
              </p>
            </div>
            <div>
              <Form onSubmit={handleSubmit}>
                <div className="bg-white rounded  p-2 d-flex justify-content-center align-items-center mt-4 shadow-sm">
                  <Form.Control
                    type="url"
                    className="me-2  border-0"
                    placeholder="Paste URL, domain or email to check"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                    style={{ maxWidth: "400px" }}
                  />

                  <Button
                    type="submit"
                    variant="dark"
                    className="btn-lg rounded larger-button"
                  >
                    Submit
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
          <Col md={6} className="my-auto d-none d-md-block">
            <img
              className="d-flex ms-auto rounded"
              style={{ objectFit: "contain", width: "99%" }}
              src={headerSec}
              alt="Data Enrichment and Analysis Illustration"
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}

const data = [
  {
    img: logo1,
    title: "Lead Generation",
    des: "ValidX can assist in generating leads by extracting essential content information about potential customers from websites.",
  },
  {
    img: logo2,
    title: "Market Segmentation",
    des: "ValidX categorizes content from companies and websites based on Domain Input. The content is automatically classified into various categories, including Industry, Headquarters Location, Revenue, Company Employees Range etc.",
  },
];
const Body = () => {
  return (
    <div style={{ backgroundColor: "#f3f8ff" }}>
      <Container>
        <Row className="mt-3">
          {data.map((item, i) => (
            <Col key={i} className="mb-4 d-flex align-items-center g-0">
              <img
                src={item.img}
                alt={item.title}
                style={{ width: "50px", height: "50px", marginRight: "10px" }}
              />
              <div>
                <h5 className="mt-2">{item.title}</h5>
                <p className="d-none d-md-block" style={{ fontSize: "14px" }}>
                  {item.des}
                </p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

const seoData = {
  title: "ValidX - Marketing Solutions",
  description:
    "Discover ValidX's marketing solutions, including lead generation and market segmentation, to enhance your business strategy.",
  keywords:
    "marketing, lead generation, market segmentation, business strategy, ValidX",
  author: "ValidX Team", 
  image: headerSec, 
  url: "https://www.validx.chargebackzero.com/use-cases/marketing",
};

function Marketing() {
  return (
    <div>
      <SEO
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        author={seoData.author}
        image={seoData.image} // Pass the imported image path
        url={seoData.url}
      />
      <Header />
      <Body />
      <Container className="">
        <h2 className="text-center mt-4">How It Works</h2>
        <img src={bodySec} className="w-100" alt="How It Works" />
      </Container>
      <Features />
      <Pricing />
      <Footer />
    </div>
  );
}

export default Marketing;
