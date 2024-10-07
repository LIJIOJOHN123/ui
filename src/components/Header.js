import React, { useEffect, useState } from "react";

import { Button, Col, Container, Form, Row } from "react-bootstrap";

import { useLocation, useNavigate } from "react-router-dom";

import HeaderImg from "../assets/file.png";

import ellipse from "../assets/ellipse.png";

import ellipse1 from "../assets/ellipse2.png";

import ellipse3 from "../assets/ellipse3.png";

import NavBar from "./NavBar";

function Header() {
  const [url, setUrl] = useState("");  
  const location = useLocation().pathname;
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/report?submittedUrl=${encodeURIComponent(url)}`);
  };

  const API = [
    {
      title: "Website Categorization",

      href: "/api/website-categorization",

      des: "Website categorization has various applications, including ensuring compliance and regulation in financial institutions, powering content filtering for parental control and enterprise solutions, enhancing targeted advertising, and improving cybersecurity by identifying and blocking malicious websites.",
    },

    {
      title: "Merchant Industry \nClassification API",

      href: "/api/merchant-industry-classification-api",

      des: "Depending on the business type, different risk factors come into play. Our solutions provide guidance based on credit card scheme rules and can automatically detect the merchant category code.",
    },

    {
      title: "Website Readiness API",

      href: "/api/website-readiness-api",

      des: "The Website Readiness API verifies that a website is accessible, the business name matches account details, it is prepared with goods, services, or registration processes, it can handle problem descriptions, and it evaluates the average opening speed of various links to ensure quick loading.",
    },

    {
      title: "Website Transparency API",

      href: "/api/website-transparency-api",

      des: "The Website Transparency API assesses a website's credibility by checking for consistency in its main URL, a functional 'Contact' link, minimal broken links, and available contact information. It also verifies that the website only offers relevant goods and services, does not request unnecessary personal or payment information, and does not redirect users to other sites during purchase or registration.",
    },

    {
      title: "Content Violation API",

      href: "/api/content-violation-api",

      des: "The Content Violation API identifies potential issues by detecting products and services that are either non-compliant with card scheme regulations or outright illegal in specific jurisdictions.",
    },

    {
      title: "Website Compliance API",

      href: "/api/website-compliance-api",

      des: "An online shop can only operate legitimately if all necessary information is available on the website. The Website Compliance API verifies the presence of links to 'Terms & Conditions' and 'Privacy Policy,' assesses privacy conditions, confirms acceptance of terms during registration or purchase, ensures a clear mention of the fulfillment process in the return and refund policy, and checks the detail and acceptability of the 'Terms & Conditions.' Additionally, it identifies the account type as an aggregator, marketplace, payment facilitator, etc.",
    },

    {
      title: "Blocklisted Companies",

      href: "/api/blocklisted-companies",

      des: "ValidX maintains its own crowdsourced warning list, which is continuously expanding. Additionally, you can create your own blacklist. Search our proprietary database of known fraudulent companies.",
    },

    {
      title: "Logo API",

      href: "/api/logo-api",

      des: "Seamlessly Embed Up-to-Date Logos into Your Products. The Logo API provides easy access to the latest logos for seamless integration.",
    },

    {
      title: "Company API",

      href: "/api/company-api",

      des: "Enrich your customer's database with relevant information. Get a full company profile from any URL, including revenue, employee range, industry classification, logos, social media links, HQ location, and more.",
    },

    {
      title: "Social Media Links API",

      href: "/api/social-media-api",

      des: "Instantly Scrape Social Media Links.\n \n Effortlessly Fetch Social Media Links from Any Website. Need to gather social media links from a website? Quickly retrieve all available social media links from any domain in no time.",
    },

    {
      title: "Parked Domain API",

      href: "/api/parked-domain-api",

      des: "The Most Effective Parked Domain Recognition API. \n \n  Easily identify parked domains with a simple API call. Many registered domains remain unused - our API helps you distinguish them with ease, streamlining your workflow and enhancing your online presence.",
    },

    {
      title: "Safe Browsing API",

      href: "/api/safe-browsing-api",

      des: "Match the website in question against known domains associated with malware, phishing, and other cybercriminal red flags.",
    },

    {
      title: "Price API",

      href: "/api/price-api",

      des: "The price is clearly stated for each item. If not, there are clear instructions on how to obtain or calculate the price. No or few (1-2) goods or services are free. There are no unreasonable offers (discounts greater than 50%, lotteries, lifetime offers, etc.).",
    },

    {
      title: "Review Page Analysis API",

      href: "/api/review-page-analysis-api",

      des: "Assess the sentiment of third-party reviews. Customer feedback is available on the merchant review/customer feedback.",
    },

    {
      title: "SSL Certificate Check API",

      href: "/api/SSL-certificate-check-api",

      des: "The SSL Certificate Check API is designed to verify and provide detailed information about SSL certificates for a given domain.",
    },

    {
      title: "Merchant Location API",

      href: "/api/merchant-location-api",

      des: "According to credit card scheme regulations, the merchant location always has to be clearly stated on the website and correspond with the acquirer’s licensed area of use. Identify any discrepancies.",
    },

    {
      title: "Country Risk API",

      href: "/api/country-risk",

      des: "The intergovernmental Financial Action Task Force maintains an updated list of high-risk jurisdictions that are considered prone to money laundering and/or terrorist financing. Our solutions work with this database to warn you about risky merchant locations based on the IP address associated with the website.",
    },
  ];

  const gradientTextStyle = {
    fontWeight: "bold",

    background: "linear-gradient(90deg, white 0%, pink 50%, gold 100%)",

    WebkitBackgroundClip: "text",

    WebkitTextFillColor: "transparent",

    MozBackgroundClip: "text",

    MozTextFillColor: "transparent",

    display: "inline-block",
  };

  const currentAPI = API.find((api) => api.href === location);

  return (
    <div
      id="/"
      className="position-relative "
      style={{
        background: "linear-gradient(to bottom, #420394, #000000)",

        height: "700px",

        display: "flex",

        justifyContent: "center", // Center horizontally
      }}
    >
      <div
        className="container mt-5 position-relative"
        style={{ width: "90%", maxWidth: "1200px" }}
      >
        <NavBar />

        <Row className="w-100 mt-4 position-absolute " style={{ top: "80px" }}>
          <Col md={5}>
            {currentAPI ? (
              <Container>
                <div
                  className="d-flex  flex-column pt-5 "
                  style={{ height: "350px", width: "100%" }}
                >
                  <h2
                    className="position-relative d-inline-block w-100"
                    style={{ whiteSpace: "pre-line", ...gradientTextStyle }}
                  >
                    {currentAPI.title}

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
                        strokeWidth="2" // Thickness of the line
                        fill="transparent"
                        strokeLinecap="round"
                      />
                    </svg>
                  </h2>{" "}
                  <div style={{ position: "relative" }}>
                    <img
                      className="position-absolute"
                      style={{ objectFit: "contain", width: "100px" }}
                      src={ellipse1}
                      alt="API illustration"
                    />

                    <img
                      className="position-absolute d-none d-lg-block"
                      style={{
                        marginTop: "-130px",

                        objectFit: "contain",

                        width: "90px",

                        left: "360px",
                      }}
                      src={ellipse3}
                      alt="API illustration"
                    />
                  </div>
                  <p
                    className="mt-4 text-white"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    {currentAPI.des}
                  </p>
                </div>

                <div style={{ marginTop: "50px" }} className="">
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
              </Container>
            ) : (
              <Container>
                <h2 className="text-white">
                  The Most Reliable{" "}
                  <span style={{ color: "#FFE55C" }}>Content</span>
                </h2>

                <h2
                  className="position-relative d-inline-block"
                  style={gradientTextStyle}
                >
                  And MCC Classification
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 100 10"
                    style={{
                      position: "absolute",

                      bottom: "-25px",

                      left: "0",

                      width: "100%", // Make the SVG width 100%

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
                      strokeWidth="1"
                      fill="transparent"
                      strokeLinecap="round"
                    />
                  </svg>
                </h2>

                <span className="text-white h2"> API</span>

                <div style={{ position: "relative" }}>
                  <img
                    className="position-absolute"
                    style={{ objectFit: "contain", width: "100px" }}
                    src={ellipse1}
                    alt="API illustration"
                  />
                </div>

                <img
                  className="position-absolute d-none  d-lg-block"
                  style={{
                    marginTop: "-130px",

                    objectFit: "contain",

                    width: "90px",

                    left: "360px",
                  }}
                  src={ellipse3}
                  alt="API illustration"
                />

                <h2 className="text-white">Available On The Internet</h2>

                <p className="mt-4 text-white">
                  All-in-one domain data source. Get Website Logos, Company
                  Data, Categorization and much more from a URL or Email.
                </p>

                <div style={{ marginTop: "100px" }} className="text-white ">
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

                      {/* Submit button */}
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
              </Container>
            )}
          </Col>

          <Col md={7} className="d-none d-md-block z-0">
            <div style={{ position: "relative", textAlign: "center" }}>
              <img
                className="position-absolute img-fluid"
                style={{
                  marginTop: "150px",
                  objectFit: "contain",
                  maxWidth: "90%",
                  width: "400px",
                }}
                src={ellipse}
                alt="API illustration"
              />

              <img
                className="img-fluid"
                style={{
                  objectFit: "contain",
                  maxWidth: "100%",
                }}
                src={HeaderImg}
                alt="API illustration"
              />
            </div>

            <div
              className="d-flex flex-row align-items-center justify-content-center"
              style={{ position: "relative", zIndex: 3 }} // Set the highest z-index for the buttons
            >
              <button
                onClick={() => {
                  localStorage.removeItem("submittedUrl");
                  navigate("/report");
                }}
                style={{
                  marginRight: "10px",
                  background: "linear-gradient(90deg, #8A2BE2, purple, gold)",
                  color: "white",
                  transition:
                    "background-color 0.3s ease-in-out, transform 0.2s ease",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                  width: "200px",
                  zIndex: 4, // Ensure this button is above the images
                }}
                className="border-white btn btn-dark btn-lg rounded"
              >
                Get Started Free
              </button>
              <button
                onClick={() => {
                  navigate("/book-a-demo");
                }}
                style={{
                  backgroundColor: "#8A2BE2",
                  cursor: "pointer",
                  width: "200px",
                  zIndex: 4, // Ensure this button is above the images
                }}
                className="border-white btn btn-dark btn-lg rounded"
              >
                Book A Demo
              </button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Header;
