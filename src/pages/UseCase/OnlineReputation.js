import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import bodySec from "../../assets/bodySec.png";
import logo10 from "../../assets/logo10.png";
import logo11 from "../../assets/logo11.png";
import logo12 from "../../assets/logo12.png";
import logo7 from "../../assets/logo7.png";
import logo8 from "../../assets/logo8.png";
import logo9 from "../../assets/logo9.png";
import bodeSec from "../../assets/onlinereputation/bodeSec.png";
import heroSec from "../../assets/onlinereputation/heroSec.png";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
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
                Online Reputation
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
                style={{ width: "539px", fontSize: "22px" }}
              >
                In today's digital age, conducting business online comes with
                its own set of challenges and risks. However, with the right
                strategies and tools, you can significantly reduce these risks.
                Utilize advanced security measures, stay informed by conducting
                thorough background checks on new partners and suppliers. By
                being proactive, you can protect your business and ensure safer
                online transactions.
              </p>
            </div>
            <div className="mt-5">
              <div className="bg-white w-75 rounded p-2 d-flex justify-content-center align-items-center mt-2 shadow-sm">
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
          <Col md={6} className=" d-none d-md-flex">
            <img
              className="d-flex ms-auto mt-5 pe-5"
              style={{ objectFit: "contain" }}
              src={heroSec}
              alt="API illustration"
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}

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
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={bodeSec}
            className="mx-auto "
            style={{ width: "90%" }}
            alt="useCase2BodySec.png"
          />
        </div>
      </Container>

      <Container>
        <h1 className="text-center ">How It Works</h1>
        <img
          src={bodySec}
          alt="img"
          style={{ objectFit: "contain", width: "99%" }}
        />

        <h1 className="text-center mt-5">Benefits</h1>
        <Row className="mt-5 mx-auto align-content-center">
          {data2.map((item, index) => (
            <Col className=" g-0 " key={index} md={4}>
              <Card className="  h-100 text-center border-0  justify-content-evenly ">
                <img
                  alt="img"
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
  title: "ValidX - Online Reputation Management",
  description:
    "Enhance your online presence and protect your business with ValidX's online reputation management strategies and tools.",
  keywords:
    "online reputation, business protection, risk management, ValidX, background checks, sales intelligence",
  author: "ValidX Team", // Optional
  image: heroSec, // Relative image path
  url: "https://www.validx.chargebackzero.com/use-cases/online-reputation",
};
function OnlineReputation() {
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

export default OnlineReputation;
