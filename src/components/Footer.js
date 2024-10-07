import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/Background_Black.png";

const Footer = () => {
  const Links = [
    { text: "Pricing", href: "/pricing" },
    { text: "FAQs", href: "/faqs" },
    // { text: "Enterprise Sales", href: "/enterprise-sales" },
    { text: "Categorization API", href: "/api/website-categorization" },
    { text: "Logo API", href: "/api/logo-api" },
    { text: "Company API", href: "/api/company-api" },
    // { text: "Import CSV File", href: "/import-csv-file" },
    // { text: "Python SDK", href: "/python-sdk" },
    // { text: "API Hub", href: "/api-hub" },
    { text: "IP Lookup API", href: "/api/country-risk" },
    { text: "Blog", href: "/blog" },
    // { text: "Sitemap", href: "/sitemap" },
  ];

  const legal = [
    {
      name: "Terms & conditions",
      link: "https://chargebackzero.com/terms-conditions",
    },
    { name: "Privacy policy", link: "https://chargebackzero.com/privacy" },
    { name: "Refund policy", link: "/refund-policy" },
    { name: "Contact Us", link: "https://chargebackzero.com/contact-us" },
  ];

  return (
    <div id="contact" className="bg-light py-5">
      <Container>
        <Row className="w-100">
          <Col>
            <div className="d-flex align-content-center justify-content-center">
              <img
                src={logo}
                className=""
                alt="logo"
                style={{
                  objectFit: "contain",
                  aspectRatio: "auto",
                  width: "250px",
                }}
              />
            </div>
          </Col>
          <Col>
            <h4>Links</h4>
            <ul className="list-unstyled">
              {Links.map((item) => (
                <li style={{ cursor: "pointer" }} key={item.text}>
                  <Link
                    to={item.href}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>
          <Col>
            <h4>Legal</h4>
            <ul className="list-unstyled">
              {legal.map((item, index) => (
                <li key={index} style={{ cursor: "pointer" }}>
                  <Link
                    className="text-decoration-none text-black"
                    to={item.link}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>
          <Col>
            <h4>Contact</h4>
            <div>Email: sales@chargebackzero.com</div>
          </Col>
          <Col className="w-100 d-flex justify-content-around">
            <a
              href="https://x.com/mFilterIt7"
              className="text-black fs-3"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-twitter-x"></i>
            </a>
            <a
              href="https://www.facebook.com/mFilterIt/"
              className="text-black fs-3"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-facebook"></i>
            </a>
            <a
              href="https://www.linkedin.com/company/mfilterit"
              className="text-black fs-3"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-linkedin"></i>
            </a>
            <a
              href="https://www.instagram.com/mfilterit/"
              className="text-black fs-3"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="bi bi-instagram"></i>
            </a>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
