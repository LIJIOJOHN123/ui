import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import logo1 from "../../assets/Cybersecurity/logo1.png";
import logo2 from "../../assets/Cybersecurity/logo2.png";
import logo3 from "../../assets/Cybersecurity/logo3.png";
import headerSec from "../../assets/InternetTelecommunication/headerSec.png";
import bodySec from "../../assets/bodySec.png";
import Features from "../../components/Features";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import Pricing from "../../components/Pricing";
import SEO from "../../components/SEO";
function Header() {
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
                Internet & Telecommunication
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
                Unlock Customer Insights, Enhance Marketing, and Ensure
                Compliance with Domain Categorization
              </p>
            </div>
            <div>
              <div className="bg-white rounded p-2 d-flex justify-content-center align-items-center mt-2 shadow-sm">
                <input
                  type="text"
                  className="form-control border-0 me-2 w-75"
                  placeholder="Paste URL, domain or email to check"
                />
                <button className="btn btn-dark btn-lg rounded w-25 h-100 larger-button">
                  Submit
                </button>
              </div>
            </div>
          </Col>
          <Col md={6} className="my-auto d-none d-md-flex">
            <img
              className="d-flex ms-auto rounded img-fluid"
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
    title: "Discover Top Customer Domains",
    des: "This tool empowers telecom companies to automatically categorize millions of domains and websites accessed daily, offering valuable insights into customer preferences and behavior.",
  },
  {
    img: logo2,
    title: "Enhance Your Online Marketing Campaigns",
    des: "By pinpointing the types of domains frequently visited by specific customer segments, telecom companies can create marketing campaigns and messages that are more likely to resonate with diverse customer groups.",
  },
  {
    img: logo3,
    title: "Compliance & Security",
    des: "Internet and telecommunications companies frequently face regulations regarding content filtering and blocking. By categorizing domains, these companies can more easily adhere to these regulations by identifying domains that fall into restricted categories and blocking them as needed.",
  },
];

const Body = () => {
  return (
    <Container>
      <Row className="mt-3">
        <Row className="">
          {data.slice(0, 2).map((item, i) => (
            <Col key={i} className=" d-flex align-items-center g-0">
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
        <Row className=" w-50 mx-auto">
          <Col key={2} className="mb-4 d-flex align-items-center g-0">
            <img
              src={data[2].img}
              alt={data[2].title}
              style={{ width: "50px", height: "50px", marginRight: "10px" }}
            />
            <div>
              <h5 className="mt-2">{data[2].title}</h5>
              <p className="d-none d-md-block" style={{ fontSize: "14px" }}>
                {data[2].des}
              </p>
            </div>
          </Col>
        </Row>
      </Row>
    </Container>
  );
};

const seoData = {
  title: "ValidX - Internet & Telecommunication",
  description:
    "Unlock customer insights, enhance marketing, and ensure compliance with domain categorization through ValidX's internet and telecommunication solutions.",
  keywords:
    "internet, telecommunication, domain categorization, customer insights, marketing campaigns, compliance, ValidX",
  author: "ValidX Team", // Add if needed
  image: headerSec, // Relative image path
  url: "https://www.validx.chargebackzero.com/use-cases/internet-telecommunication",
};

function InternetTelecommunication() {
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

export default InternetTelecommunication;
