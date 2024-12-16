import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { planAction } from "../store/planSlice";
import { useDispatch, useSelector } from "react-redux";
import { getLocalStorage, setLocalStorage } from "../utils/LocalStorage";

const Pricing = () => {
  const [monthlyPlan, setMonthlyPlan] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, loading, count } = useSelector((state) => state.plan);
  const token = getLocalStorage("authToken");
  useEffect(() => {
    dispatch(planAction());
  }, []);
  const plans = [
    {
      id: data[0]?._id,
      name: data[0]?.name,
      price: "Free",
      button: "FREE 7-Days TRIAL",
      credits: "25",
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
      id: data[1]?._id,
      name: data[1]?.name,
      price: "$49.99",
      priceText: "Per month",
      button: "Get API Key",
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
      id: data[2]?._id,
      name: data[2]?.name,
      price: "$99.99",
      priceText: "Per month",
      button: "Get API Key",
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
      id: data[3]?._id,
      name: data[3]?.name,
      price: "$199.99",
      priceText: "/month",
      button: "Get API Key",
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
      id: data[4]?._id,
      name: data[4]?.name,
      price: "Talk to us",
      button: "Talk to us",
      link: "/book-a-demo",
      credits: "Custom Volume",
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
  const togglePlan = () => {
    setMonthlyPlan(!monthlyPlan);
  };
  return (
    <div className="mt-5  overflow-x-hidden" id="pricing">
      <h2 className="text-center ">Our Pricing Plans</h2>
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
            checked={!monthlyPlan} // Reflect the state
            onChange={togglePlan} // Toggle the plan
          />
          <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
            Annually (2 months FREE)
          </label>
        </span>
      </p>

      <Row className="g-1 justify-content-center">
        {plans.map((plan, index) => {
          const displayPrice = monthlyPlan
            ? plan.price
            : `$${
                !isNaN(parseFloat(plan.price.replace("$", "")))
                  ? (parseFloat(plan.price.replace("$", "")) * 10).toFixed(2)
                  : plan.price
              }`;

          const displayPriceText = monthlyPlan ? plan.priceText : "Per year";

          const creditsText = monthlyPlan
            ? "credits per month"
            : "credits per year";

          return (
            <Col key={index} md={2}>
              <Card className="border-white">
                <Card.Body>
                  <Card.Title
                    className="text-center"
                    style={{ color: "#8f53b2" }}
                  >
                    {plan.name}
                  </Card.Title>
                  <Card.Subtitle className="text-center ">
                    <h2 className="fw-semibold m-0">
                      {index !== 0 && index !== plans.length - 1
                        ? displayPrice
                        : plan.price}{" "}
                      <span className="fw-normal" style={{ fontSize: "14px" }}>
                        {index !== 0 && index !== plans.length - 1
                          ? displayPriceText
                          : plan.priceText}
                      </span>
                    </h2>
                  </Card.Subtitle>
                  <div className="mt-1" style={{ fontSize: "12px" }}>
                    {index !== 0 && index !== plans.length - 1
                      ? creditsText
                      : " "}{" "}
                    {/* Use a non-breaking space */}
                  </div>

                  <div
                    className="w-100 bg-white border rounded border-2 border-black mb-3 px-2"
                    style={{
                      height: "30px",
                      lineHeight: "30px",
                      border: "1px solid",
                    }}
                  >
                    {plan.credits}
                  </div>

                  <Button
                    className="text-center w-100 fw-medium border-0"
                    style={{ backgroundColor: "#bf54bd" }}
                    onClick={() => {
                      setLocalStorage("payment", plan.id);
                      if (token) {
                        navigate("/dashboard");
                      } else {
                        navigate("/auth/login");
                      }
                    }}
                  >
                    {plan.button}
                  </Button>
                  <ul
                    className="mt-2 "
                    style={{ listStyleType: "none", paddingLeft: "0" }}
                  >
                    {plan.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className=" w-100"
                        style={{
                          position: "relative",
                          fontSize: "12px",
                          paddingLeft: "20px",
                          color: idx === 2 ? "#bf54bd" : "inherit",
                          fontWeight:
                            idx === 0 || idx === 1 || idx === 2
                              ? "bolder"
                              : "normal", // Adjust font weight for idx 0 and 1
                        }}
                      >
                        <span
                          style={{
                            position: "absolute",
                            left: "0",
                            color: idx === 2 ? "#bf54bd" : "#8f53b2",
                            fontWeight: "bold",
                          }}
                        >
                          {idx === 2 ? "" : "✓"}
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default Pricing;
