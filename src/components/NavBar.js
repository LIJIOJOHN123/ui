import React from "react";

import { Link, useNavigate } from "react-router-dom";

import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

import logo from "../assets/Background.png";

function NavBar() {
  const navigate = useNavigate();

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

  const link = [
    { text: "Pricing", link: "/#pricing" },

    { text: "FAQs", link: "/faqs" },

    { text: "Use Cases", link: "/use-cases" },

    { text: "API", link: "/api" },

    { text: "Demo & Docs", link: "/auth/login" },

    // { text: "ImportCSV File", link: "#importcsv" },
  ];

  const UseCases = [
    {
      title: "Merchant Risk Assessment Simplified",

      href: "/use-cases/merchantriskassessmentsimplified",
    },

    {
      title: "Merchant Industry Classification",

      href: "/use-cases/merchant-industry-classification",
    },

    {
      title: "Data Enrichment & Analysis",

      href: "/use-cases/data-enrichment-analysis",
    },

    {
      title: "Publishing & Advertising",

      href: "/use-cases/publishing-advertising",
    },

    {
      title: "Cybersecurity",

      href: "/use-cases/cybersecurity",
    },

    {
      title: "Internet & Telecommunication",

      href: "/use-cases/internet-telecommunication",
    },

    {
      title: "Marketing",

      href: "/use-cases/marketing",
    },

    { title: "Sales Intelligence", href: "/use-cases/salesintelligence" },

    // { title: "Online Reputation", href: "/use-cases/onlinereputation" },

    { title: "Law Enforcement", href: "/use-cases/law-enforcement" },
  ];

  const handleNavigation = (url) => {
    navigate(url);
  };

  return (
    <div>
      {" "}
      <Navbar
        className="rounded "
        style={{ color: "white", zIndex: 10 }}
        bg="dark"
        expand="lg"
      >
        <Container fluid>
          <Navbar.Brand className="text-white " as={Link} to="/">
            <img src={logo} className="img-fluid" alt="logo" width={90} />
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls="navbarSupportedContent"
            className="bg-white"
          />

          <Navbar.Collapse id="navbarSupportedContent" className="">
            <Nav
              className=" mb-2 mb-lg-0    w-75 text-white"
              style={{ gap: "20px" }}
            >
              {link.map((item, index) =>
                index === 3 ? (
                  <NavDropdown
                    key={index}
                    title={<span style={{ color: "white" }}>{item.text}</span>}
                    className="custom-dropdown"
                    id="navbarDropdown"
                  >
                    {API.map((api) => (
                      <NavDropdown.Item
                        key={api.href}
                        onClick={() => handleNavigation(api.href)}
                      >
                        {api.title}
                      </NavDropdown.Item>
                    ))}
                  </NavDropdown>
                ) : index === 2 ? (
                  <NavDropdown
                    className="custom-dropdown"
                    key={index}
                    title={<span style={{ color: "white" }}>{item.text}</span>}
                    id="navbarDropdown"
                  >
                    {UseCases.map((useCase) => (
                      <NavDropdown.Item
                        key={useCase.href}
                        onClick={() => handleNavigation(useCase.href)}
                      >
                        {useCase.title}
                      </NavDropdown.Item>
                    ))}
                  </NavDropdown>
                ) : (
                  <Nav.Link
                    className="text-white"
                    key={index}
                    as={Link}
                    to={item.link}

                    // ////////
                  >
                    {item.text}
                  </Nav.Link>
                )
              )}
            </Nav>

            <Link to="/auth/login">
              <Button className="bg-transparent border-white me-3">
                SIGN IN
              </Button>
            </Link>

            <Button
              onClick={() => {
                navigate("/report");
              }}
              style={{ backgroundColor: "#F0E68C" }}
              className="text-black  border-0 "
            >
              GET STARTED
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;
