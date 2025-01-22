import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { planAction } from "../../store/planSlice";
import { useDispatch, useSelector } from "react-redux";
import { getLocalStorage, setLocalStorage } from "../../utils/LocalStorage";
import { apiBatchClientAction } from "../../store/apiResponseManagement";

const Pricing = () => {
  const [monthlyPlan, setMonthlyPlan] = useState(true);
  const [selectedCurrency, setSelectedCurrency] = useState('INR');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: plans } = useSelector((state) => state.plan);
  const token = getLocalStorage("authToken");




  const { data } = useSelector((state) => state.apiResponseManagement);
  useEffect(() => {
    dispatch(apiBatchClientAction());
  }, [])

  useEffect(() => {
    const queryStringValue = {
      indexofplan: true,
      planstatus: "PUBLISHED",
      plantype: monthlyPlan ? "Monthly" : "Yearly",
      currency: selectedCurrency
    };
    let queryString = Object.entries(queryStringValue)
      .filter(([_, value]) => value !== "")
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    dispatch(planAction(1, 4, queryString));
  }, [monthlyPlan, selectedCurrency, dispatch]);



  const togglePlan = () => {
    setMonthlyPlan(!monthlyPlan);
  };

  const handleCurrencyChange = (event) => {
    setMonthlyPlan(!monthlyPlan);
    setSelectedCurrency(event.target.value);
  };

  return (
    <div className="mt-5 overflow-x-hidden" id="pricing">
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
            Annually
          </label>
        </span>
      </p>
      <br />
      <Row className="justify-content-center">
        <Col md={6} xs={12} className="text-center">
          <Form>
            <div className="d-flex justify-content-center">

              <Form.Check
                type="radio"
                label="USD - United States Dollar"
                name="currency"
                value="USD"
                checked={selectedCurrency === 'USD'}
                onChange={handleCurrencyChange}
                custom
                className="me-3"
              />
              <Form.Check
                type="radio"
                label="INR - Indian Rupee"
                name="currency"
                value="INR"
                checked={selectedCurrency === 'INR'}
                onChange={handleCurrencyChange}
                custom
                className="me-3"  // Add margin to the right for spacing
              />
            </div>
          </Form>
        </Col>
      </Row>

      <Row className="g-1 d-flex justify-content-evenly">
        {plans.map((plan, index) => {
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
                      {index === 3 ? "Custom" : `${plan.currencySymbol}${plan.pricing}`}

                      <span className="fw-normal" style={{ fontSize: "14px" }}>
                        {index === 3 ? "" : monthlyPlan ? "Monthly" : "Yearly"}
                      </span>
                    </h2>
                  </Card.Subtitle>
                  <div className="mt-1" style={{ fontSize: "12px" }}>
                    {index === 3
                      ? "Custom"
                      : index !== 0 && index !== plans.length - 1
                        ? creditsText
                        : " "}

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
                    {index === 3 ? "Custom" : plan.credit}

                  </div>






                  {index === 3 ? (
                    <Button
                      className="text-center w-100 fw-medium border-0"
                      style={{ backgroundColor: "#bf54bd" }}
                      onClick={() => {
                        navigate("/book-a-demo");
                      }}
                    >
                      Custom
                    </Button>
                  ) : (
                    <Button
                      className="text-center w-100 fw-medium border-0"
                      style={{ backgroundColor: data?.planId === plan._id ? "green" : "#bf54bd" }}
                      onClick={() => {
                        setLocalStorage("payment", plan._id);
                        if (token) {
                          navigate("/dashboard");
                        } else {
                          navigate("/auth/login");
                        }
                      }}
                    >
                      BUY NOW
                    </Button>
                  )}
                  <ul
                    className="mt-2 "
                    style={{ listStyleType: "none", paddingLeft: "0" }}
                  >
                    {plan.des.split(",").map((feature, idx) => (
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
