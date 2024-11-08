import React, { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";

function Plans() {
  const [selectedPlan, setSelectedPlan] = useState("Free");
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Free",
      monthlyPrice: "Free",
      annualPrice: "Free",
      credits: "50",
      features: [
        "25 Successful API calls / month",
        "25 requests per minute",
        "Website Categorization API",
        "Merchant Category Code API",
        "Merchant Category Code API",
        "Malicious URL Checker API",
        "Phishing Detection API",
        "Domain Reputation API",
        "Parked Domain Detection API",
        "Service-level agreement (SLA)",
        "Multi-site license",
        "Cancel any time",
      ],
    },
    {
      name: "Starter",
      monthlyPrice: "$49.99",
      annualPrice: "$499.99",
      credits: "500",
      features: [
        "500 Successful API calls / month",
        "120 requests per minute",
        "Includes Free Plan, plus:",
        "Logo API",
        "Social Media Links Scraper API",
        "Company API",
        "Whois Scan API",
        "Website Contact API",
        "Service-level agreement (SLA)",
        "Multi-site license",
        "Cancel any time",
      ],
    },
    {
      name: "Professional",
      monthlyPrice: "$99.99",
      annualPrice: "$999.99",
      credits: "2,000",
      features: [
        "2000 Successful API calls / month",
        "120 requests per minute",
        "Includes Starter Plan, plus:",
        "Google Review Page Analysis API",
        "Geo IP & Reverse Lookup API",
        "Website Crawling and Archiving",
        "SSL Certificate Check API",
        "Market Segmentation API",
        "Service-level agreement (SLA)",
        "Multi-site license",
        "Cancel any time",
      ],
    },
    {
      name: "Business",
      monthlyPrice: "$199.99",
      annualPrice: "$1,999.99",
      credits: "5,000",
      features: [
        "5000 Successful API calls / month",
        "120 requests per minute",
        "Includes Professional Plan, plus:",
        "Website Readiness API",
        "Website Transparency API",
        "Website Compliance Detection API",
        "Website Price Point API",
        "Merchant Website Location API",
        "Service-level agreement (SLA)",
        "Multi-site license",
        "Cancel any time",
      ],
    },
    {
      name: "Enterprise",
      monthlyPrice: "Talk to us",
      annualPrice: "Talk to us",
      credits: "Custom",
      features: [
        `Custom Volume `,
        "360 requests per minute",
        "Includes Business Plan, plus:",
        "Website Screenshot API",
        "Similar Company API",
        "Website Techstack API",
        "Website Visitor Traffic Analysis API",
        "Risk Scoring (high, moderate, and low)",
        "Service-level agreement (SLA)",
        "Multi-site license",
        "Cancel any time",
      ],
    },
  ];

  const handleUpgradeClick = (planName) => {
    setSelectedPlan(planName);
  };

  return (
    <div>
      <h3 className="text-center">
        The Most Accurate & Affordable Anti-Fraud Protection!
      </h3>
      <p className="text-center" style={{ fontSize: "18px" }}>
        Loss Headaches and Greater ROI-Fight Fraud and save Money at the Same
        Time!
      </p>
      <p className="text-center" style={{ fontSize: "18px" }}>
        No Contracts Cancel Anytime
      </p>
      <div className="mt-5">
        <h2 className="text-center">Our Pricing Plans</h2>
        <p className="text-center text-black">
          No long term commitments. One click upgrade/downgrade or cancellation.
          No questions asked.
        </p>
        <p className="d-flex align-items-center m-0 justify-content-center text-black align-content-center">
          Monthly
          <span className="form-check form-switch ms-2 me-2">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              checked={isAnnual}
              onChange={() => setIsAnnual(!isAnnual)}
            />
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckDefault"
            >
              Annually (2 months FREE)
            </label>
          </span>
        </p>

        <Row className="justify-content-center mt-2">
          {plans.map((plan, index) => (
            <Col key={index} className="  ">
              <Card className=" border-white">
                <Card.Body className="d-flex flex-column">
                  <Card.Title
                    className="text-center"
                    style={{ color: "#8f53b2" }}
                  >
                    {plan.name}
                  </Card.Title>

                  <Card.Subtitle className="text-center  ">
                    <div className="h4 fw-semibold">
                      {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                      {isAnnual && plan.monthlyPrice !== plan.annualPrice && (
                        <div className="fw-normal" style={{ fontSize: "14px" }}>
                          {plan.monthlyPrice &&
                            ` (Monthly: ${plan.monthlyPrice})`}
                        </div>
                      )}
                    </div>
                  </Card.Subtitle>
                  <Button
                    className="text-center fw-medium border-0"
                    style={{
                      backgroundColor:
                        selectedPlan === plan.name ? "green" : "indigo",
                      color: "white",
                    }}
                    onClick={() => handleUpgradeClick(plan.name)}
                  >
                    {selectedPlan === plan.name
                      ? "Current Plan"
                      : "Upgrade Plan"}
                  </Button>

                  <div className="mt-3" style={{ fontSize: "12px" }}>
                    {index !== 0 && index !== plans.length - 1
                      ? isAnnual
                        ? "Credits per year"
                        : "Credits per month"
                      : "\u00A0"}
                  </div>

                  <select
                    className="w-100 bg-white border rounded border-2 border-black mb-3"
                    style={{ height: "30px", border: "1px solid" }}
                  >
                    <option>{plan.credits}</option>
                  </select>

                  <ul
                    className="mt-2 "
                    style={{ listStyleType: "none", paddingLeft: "0" }}
                  >
                    {plan.features.map((feature, idx) => (
                      <li
                        key={idx}
                        style={{
                          position: "relative",
                          fontSize: "12px",
                          paddingLeft: "20px",
                          color: idx === 2 ? "#bf54bd" : "inherit",
                          fontWeight: idx < 3 ? "bolder" : "normal",
                        }}
                      >
                        <span
                          style={{
                            position: "absolute",
                            left: "0",

                            fontWeight: "bold",
                          }}
                        >
                          {idx !== 2 && "✓"}
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default Plans;
