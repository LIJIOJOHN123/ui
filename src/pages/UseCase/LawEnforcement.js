import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import bodySec from "../../assets/bodySec.png";
import headerSec from "../../assets/law-enforcement/headerSec.png";
import logo1 from "../../assets/law-enforcement/logo1.png";
import logo2 from "../../assets/law-enforcement/logo2.png";
import logo3 from "../../assets/law-enforcement/logo3.png";
import logo4 from "../../assets/law-enforcement/logo4.png";
import logo10 from "../../assets/logo10.png";
import logo11 from "../../assets/logo11.png";
import logo12 from "../../assets/logo12.png";
import logo7 from "../../assets/logo7.png";
import logo8 from "../../assets/logo8.png";
import logo9 from "../../assets/logo9.png";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
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
                LAW ENFORCEMENT
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
                className="mt-5  fw-lighter text-white lead  h-100"
                style={{ width: "539px", fontSize: "22px" }}
              >
                Domain name data is essential for combating cybercrime by
                offering valuable insights into the activities of
                cybercriminals. By examining domain name registrations,
                ownership details,
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
          <Col md={6} className="my-auto d-none d-md-flex">
            <img
              className="d-flex ms-auto rounded  img-fluid "
              style={{ objectFit: "contain", width: "99%" }}
              src={headerSec}
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

const data = [
  {
    img: logo1,
    title: "Exposing Cybercrime",
    des: "Reveal the digital footprints left by cybercriminals, including their domains, websites, associated IP addresses, geolocation data, nameservers, and other internet records. Enhance your investigative efforts by uncovering additional insights from properties that share similar DNS infrastructure and characteristics, providing domain data for law enforcement agencies from ValidX.",
  },
  {
    img: logo2,
    title: "Safeguarding the Digital Landscape",
    des: "Improve community, entity, and individual safety with our real-time and early threat detection capabilities. Provide advanced law enforcement repositories and systems with immediate DNS event updates, enabling the identification of suspicious domains, subdomains, IP addresses, and other internet properties, effectively thwarting emerging threats.",
  },
  {
    img: logo3,
    title: "Disrupting Cybercriminal Networks",
    des: "Gather critical information to dismantle cybercriminal infrastructures by scrutinizing the registration, administration, and assignment details of confirmed malicious domains and IP addresses. Supply vital DNS intelligence to support legal documentation and processes necessary for swift takedown actions.",
  },
  {
    img: logo4,
    title: "Preserving Brand Integrity",
    des: "Ensure real-time access to domain registration data, facilitating the prompt detection of domain drop-catching and cybersquatting activities that could fuel counterfeiting. Streamline the identification process by uncovering additional domains registered by the offending party, ensuring that counterfeit operations are intercepted before they can harm brand reputation.",
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

                <p className=" px-1" style={{ fontSize: "14px" }}>
                  {item.des}
                </p>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      <Container>
        <h1 className="text-center mt-2">How It Works</h1>
        <img
          src={bodySec}
          className=" "
          alt="[oiouhj"
          style={{ objectFit: "contain" }}
        />

        <h1 className="text-center mt-5">Benefits</h1>
        <Row className="mt-5 ">
          {data2.map((item, index) => (
            <Col className=" g-0 " key={index} md={4}>
              <Card className="  h-100 text-center border-0  justify-content-evenly">
                <img
                  src={item.img}
                  alt="hjgh"
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
  title: "ValidX - Law Enforcement",
  description:
    "Explore ValidX's solutions for law enforcement, enhancing cybersecurity efforts with data enrichment and analysis.",
  keywords:
    "law enforcement, cybersecurity, data enrichment, analysis, cybercrime, ValidX",
  author: "ValidX Team", // Add if needed
  image: headerSec, // Relative image path
  url: "https://www.validx.chargebackzero.com/use-cases/data-enrichment-analysis",
};
function LawEnforcement() {
  return (
    <div>
      <SEO
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        author={seoData.author}
        image={seoData.image}
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

export default LawEnforcement;
