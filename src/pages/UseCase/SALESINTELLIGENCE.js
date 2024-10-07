import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import bodySec from "../../assets/bodySec.png";
import logo10 from "../../assets/logo10.png";
import logo11 from "../../assets/logo11.png";
import logo12 from "../../assets/logo12.png";
import logo7 from "../../assets/logo7.png";
import logo8 from "../../assets/logo8.png";
import logo9 from "../../assets/logo9.png";
import heroSec from "../../assets/salesintelligence/heroSec.png";
import logo1 from "../../assets/salesintelligence/logo1.png";
import logo2 from "../../assets/salesintelligence/logo2.png";
import logo3 from "../../assets/salesintelligence/logo3.png";
import logo4 from "../../assets/salesintelligence/logo4.png";
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
                SALES INTELLIGENCE
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
                className="mt-5  fw-lighter text-white lead w-100 "
                style={{ width: "539px", fontSize: "22px" }}
              >
                Stop Wasting Time Doing Lead Enrichment
              </p>
            </div>
            <div className="">
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
            </div>
          </Col>
          <Col md={6} className="my-auto d-none d-md-flex">
            <img
              className="d-flex ms-auto pe-5  img-fluid "
              style={{ objectFit: "contain", width: "99%" }}
              src={heroSec}
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
    title:
      "Identify Potential Clients, Research Competitors, and Analyze the Market",
    des: "Leverage domain data for sales intelligence to gain a competitive edge. With ValidX solutions, partners can identify companies that align with their ideal customer profile and monitor competitors effectively.",
  },
  {
    img: logo2,
    title: "Find Your Ideal Customer",
    des: "Locating customers that match your Ideal Customer Profile (ICP) can be challenging. Use metacontent searches to find customers with specific keywords in their HTML information and utilize web data for comprehensive sales intelligence.",
  },
  {
    img: logo3,
    title: "Uncover Connections Between Domain Names",
    des: "Perform reverse lookups to explore networks surrounding any domain of interest. Track the digital footprint of your clients' competitors, including domains sharing the same IP address, name servers, and mail services.",
  },
  {
    img: logo4,
    title: "Initiate New Business Relationships Confidently",
    des: "Utilize WHOIS records to conduct thorough background checks on new suppliers, customers, and partners before making significant commitments or signing contracts.",
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
    <div className="h-25 ">
      <Container className="mt-4 ">
        <Row className="mt-5 ms-4">
          {data.map((item, index) => (
            <Col className=" g-0  " key={index} md={6}>
              <Card className=" w-75 h-100 text-center border-0  justify-content-evenly">
                <img
                  src={item.img}
                  alt="kljkyjghf"
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
          src={bodySec}
          alt="Text"
          style={{ objectFit: "contain", width: "99%" }}
        />

        <h1 className="text-center mt-5">Benefits</h1>
        <Row className="mt-5 w-100 ">
          {data2.map((item, index) => (
            <Col className=" g-0 " key={index} md={4}>
              <Card className=" w-100 h-100 text-center border-0  justify-content-evenly">
                <img
                  src={item.img}
                  alt="ki"
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
  title: "ValidX - Sales Intelligence",
  description:
    "Stop wasting time doing lead enrichment. Discover how ValidX's sales intelligence solutions can help you identify potential clients and analyze the market.",
  keywords:
    "sales intelligence, lead enrichment, market analysis, ValidX, customer research, business relationships",
  author: "ValidX Team", // Optional
  image: heroSec, // Relative image path
  url: "https://www.validx.chargebackzero.com/use-cases/sales-intelligence",
};
function SALESINTELLIGENCE() {
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
      <section>
        <Body />
      </section>
      <Footer />
    </div>
  );
}

export default SALESINTELLIGENCE;
