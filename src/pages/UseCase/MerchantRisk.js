import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import bodySec from "../../assets/bodySec.png";
import customerOnbroadingImg from "../../assets/customer-onbroading.png";
import logo1 from "../../assets/logo1.png";
import logo10 from "../../assets/logo10.png";
import logo11 from "../../assets/logo11.png";
import logo12 from "../../assets/logo12.png";
import logo2 from "../../assets/logo2.png";
import logo3 from "../../assets/logo3.png";
import logo4 from "../../assets/logo4.png";
import logo5 from "../../assets/logo5.png";
import logo6 from "../../assets/logo6.png";
import logo7 from "../../assets/logo7.png";
import logo8 from "../../assets/logo8.png";
import logo9 from "../../assets/logo9.png";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import SEO from "../../components/SEO";
import { useNavigate } from "react-router-dom";

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
        <Row className="w-100  position-absolute" style={{ top: "80px" }}>
          <Col md={6}>
            <div
              className="d-flex  flex-column pt-5"
              style={{ height: "350px", width: "100%" }}
            >
              <h2
                className="position-relative d-inline-block   "
                style={{ fontSize: "30px", ...gradientTextStyle }}
              >
                Merchant Risk Assessment Simplified
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
              </h2>

              <p
                className="mt-5  fw-lighter text-white lead w-100"
                style={{ width: "500px", fontSize: "22px" }}
              >
                One Powerful API : Analyze 100+ Risk Signals Across Merchant
                Websites and Online Reputation in Under 4 Minutes{" "}
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
          <Col md={6} className="d-none d-md-block">
            <img
              className="d-flex ms-auto pe-5"
              style={{ objectFit: "contain" }}
              src={customerOnbroadingImg}
              alt="API illustration"
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
    title: "Website Data",
    des: "Review key data points from the merchant’s website readiness, transparency, policy pages, compliance, pricing, cyber risk, etc.",
  },
  {
    img: logo2,
    title: "Industry Classification",
    des: "Validate industry based on website content and indicators from third parties.",
  },
  {
    img: logo3,
    title: "Social Media Analysis",
    des: "Analyze local and industry-level profiles to assess sentiments and activity.",
  },
  {
    img: logo4,
    title: "Incorporation Verification",
    des: "Validate the business against the registry and verify key documents.",
  },
  {
    img: logo5,
    title: "Review Page Analysis",
    des: "Assess sentiments of third-party reviews.",
  },
  {
    img: logo6,
    title: "Blacklisted Companies",
    des: "Search our proprietary database of known fraudulent companies.",
  },
];

const data2 = [
  {
    img: logo7,
    title: "Avoid Fraud Loss",
    des: "Detecting fraudulent and other problematic merchant activity through merchant URI analysis helps prevent fraud losses.",
  },
  {
    img: logo8,
    title: "Fewer Fines",
    des: "Failure to detect prohibited or money laundering activities by merchants puts the payment provider at risk of regulatory action, as well as fines by card brands.",
  },
  {
    img: logo9,
    title: "Reduce Manual Review",
    des: "We help identify the 10% of cases that actually need further attention. You can redeploy the majority of your human analysis time and skill elsewhere.",
  },
  {
    img: logo10,
    title: "Speed up Time to Activation",
    des: "The ability to accept more prospective merchants, having the confidence that problematic behaviors will be caught before they cause problems.",
  },
  {
    img: logo11,
    title: "Customer Experience",
    des: "Help offer a high-quality customer experience while efficiently identifying SMB fraud, leading to increased customer satisfaction and loyalty.",
  },
  {
    img: logo12,
    title: "Data-Driven Decision",
    des: "To help make more informed decisions about whether to terminate or remediate merchants to align with the organization's risk tolerance.",
  },
];

const Body = () => {
  return (
    <div className="h-25">
      <Container className="mt-4 ">
        <h1 className="text-center ">Merchant Web Presence Analysis</h1>
        <p className="h4 fw-lighter text-center">
          Analyze hundreds of risk signals from across the merchants web
          presence in under 30 seconds
        </p>
        <Row className="mt-5  ">
          {data.map((item, index) => (
            <Col className=" g-0 " key={index} md={4}>
              <Card className="h-100 text-center border-0  justify-content-evenly">
                <img
                  alt="khj"
                  src={item.img}
                  className="d-block mx-auto"
                  style={{ objectFit: "contain", width: "75px" }}
                />

                <h5 className=" text-center mt-3 px-2 fw-bold ">
                  {item.title}
                </h5>

                <p className=" px-3" style={{ fontSize: "14px" }}>
                  {item.des}
                </p>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Container>
        <h1 className="text-center ">How It Works</h1>
        <img
          alt="lk"
          src={bodySec}
          className=" "
          style={{ objectFit: "contain", width: "99%" }}
        />

        <h1 className="text-center mt-5">Benefits</h1>
        <Row className="mt-5 w-100 ">
          {data2.map((item, index) => (
            <Col className=" g-0 " key={index} md={4}>
              <Card className=" h-100 text-center border-0  justify-content-evenly">
                <img
                  alt="kp"
                  src={item.img}
                  className="d-block mx-auto"
                  style={{ objectFit: "contain", width: "75px" }}
                />

                <h5 className=" text-center mt-3 px-2 fw-bold ">
                  {item.title}
                </h5>

                <p className=" px-3" style={{ fontSize: "14px" }}>
                  {item.des}
                </p>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

const seoData = {
  title: "ValidX - Merchant Risk Assessment",
  description:
    "Simplifying merchant risk assessment with a powerful API that analyzes 100+ risk signals across merchant websites in under 4 minutes.",
  keywords:
    "merchant risk assessment, risk signals, API, fraud detection, website analysis, ValidX",
  author: "ValidX Team", // Add if needed
  image: customerOnbroadingImg, // Relative image path
  url: "https://www.validx.chargebackzero.com/use-cases/merchant-risk-assessment",
};
function MerchantRisk() {
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
      <Footer />
    </div>
  );
}

export default MerchantRisk;
