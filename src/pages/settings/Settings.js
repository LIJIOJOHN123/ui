import {
  AlertTriangle,
  Camera,
  EyeIcon,
  EyeOff,
  FileText,
  Globe,
  List,
  PieChart,
  Settings2,
  CircleGauge as Speedometer,
  Trash2,
  Users,
  Volume2,
  XCircle,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import ProfilePage from "./ProfilePage";
import { clientActivePlanProductAction } from "../../store/apiResponseManagement";
import { useDispatch } from "react-redux";

const AccountDetails = () => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    API: "",
    phone: "",
    company: "",
    country: "",
    website: "",
    apikey: "",
  });
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { activePlan } = useSelector((state) => state.apiResponseManagement);
  useEffect(() => {
    dispatch(clientActivePlanProductAction());
  }, [])
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        API: user.API || "",
        phone: user.phone || "",
        company: user.company || "",
        country: user.country || "",
        website: user.website || "",
        apikey: user.apikey || "",
      });
    }
  }, [user])

  console.log(activePlan, "activePlan")
  useEffect(() => {
    if (isAuthenticated) {
      setFormData((prev) => ({ ...prev, ...user }));
    }
  }, [isAuthenticated, user]);

  const [showAPI, setShowAPI] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const toggleAPIVisibility = () => {
    setShowAPI(!showAPI);
  };



  const data = [
    { icon: <Volume2 />, name: "Custom Volume" },
    { icon: <Speedometer />, name: "360 requests per minute" }, // or <CircleGauge />
    { icon: <List />, name: "Includes Business Plan, plus:" },
    { icon: <Camera />, name: "Website Screenshot API" },
    { icon: <Users />, name: "Similar Company API" },
    { icon: <Settings2 />, name: "Website Techstack API" }, // or <Settings2 />
    { icon: <PieChart />, name: "Website Visitor Traffic Analysis API" },
    {
      icon: <AlertTriangle />,
      name: "Risk Scoring (high, moderate, and low)",
      // className: "text-danger",
    },
    { icon: <FileText />, name: "Service-level agreement (SLA)" },
    { icon: <Globe />, name: "Multi-site license" }, // or <MapPin />
    { icon: <XCircle />, name: "Cancel any time" },
  ];
  return (
    <div>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label className="fw-bold">Name</Form.Label>

            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="me-2  border-black"
              placeholder="Name"
              disabled
            />
          </Form.Group>
          <div className="mt-2">
            <p className="fw-semibold my-0">Plan Details – {activePlan?.name}</p>
            <p className="fw-semibold">491821</p>
          </div>
          <div className="mt-2">
            <p className="fw-semibold my-0">Plan type : {activePlan?.plantype}</p>
            <p className="fw-semibold">Plan Price : {activePlan?.currencySymbol} {activePlan?.pricing}</p>
          </div>
          <div className="mt-2">
            <p className="fw-semibold text-decoration-underline my-0">
              Plan Highlights
            </p>
            <Row>
              <Col className="fw-semibold">
                <ul className="list-unstyled">
                  {data.slice(0, 6).map((item, i) => (
                    <li key={i} className="d-flex align-items-center mb-2">
                      <span className={item.className}>{item.icon}</span>
                      <span className="ms-2">{item.name}</span>
                    </li>
                  ))}
                </ul>
              </Col>
              <Col className="fw-semibold">
                <ul className="list-unstyled">
                  {data.slice(6, 11).map((item, i) => (
                    <li key={i} className="d-flex align-items-center mb-2">
                      <span className={item.className}>{item.icon}</span>
                      <span className="ms-2">{item.name}</span>
                    </li>
                  ))}
                </ul>
              </Col>
            </Row>
          </div>
          <div className="mt-3">
            <Form.Group>
              <Form.Label className="fw-bold">Email</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="text"
                  name="email"
                  value={formData.email}
                  className="  border-black"
                  onChange={handleInputChange}
                  placeholder="Email"
                  disabled
                />
              </div>
            </Form.Group>
            <Form.Group className="mt-3">
              <Form.Label className="fw-bold">API Key</Form.Label>
              <div className="d-flex align-items-center">
                <Form.Control
                  type={showAPI ? "text" : "password"} // Toggle input type between text and password
                  name="API"
                  value={formData.apikey}
                  onChange={handleInputChange}
                  placeholder="API"
                  className="  border-black"
                />
                <div
                  className="ms-2"
                  style={{ cursor: "pointer" }}
                  onClick={toggleAPIVisibility}
                >
                  {showAPI ? <EyeOff /> : <EyeIcon />}
                </div>
                <div className="ms-2" style={{ cursor: "pointer" }}>
                  <Trash2 />
                </div>
              </div>
            </Form.Group>
            <p className="mt-3" style={{ fontSize: "14px" }}>
              Classify website with over 70 website categories for easier
              analysis of unknown sites.
            </p>
          </div>
        </Col>
        <Col md={5}>
          <Form.Group as={Row} className="mb-3 mt-1">
            <Form.Label column sm="2" className="fw-bold">
              Phone
            </Form.Label>
            <Col sm="5">
              <Form.Control
                type="number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
                placeholder="Phone"
                className="  border-black"
                disabled
              />
            </Col>
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label className="fw-bold">Company</Form.Label>
            <div>
              <Form.Control
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Company"
                className="  border-black"
                disabled
              />
            </div>
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label className="fw-bold">Country</Form.Label>
            <div>
              <Form.Control
                type="text"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                placeholder="Country"
                className="  border-black"
                disabled
              />
            </div>
          </Form.Group>
          <h6 className="mt-4">Domains</h6>
          <p
            className="fw-semibold"
            style={{ fontSize: "10px", lineHeight: "20px" }}
          >
            Please place only one website per input box without http(s). www or
            / Subdomains are optional. You can add or remove sites at any time.
            Domains are used to validate JavaScript tools are not being used by
            unauthorized domains which would unfairly use your account credits.
          </p>
          <Form.Group className="mt-5">
            <div>
              <Form.Control
                type="text"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="Website 1"
                className="  border-black"
                disabled
              />
            </div>
          </Form.Group>
          {/* <Form.Group className="mt-3">
          <div>
            <Form.Control
              type="text"
              name="webSiteName2"
              value={formData.website}
              onChange={handleInputChange}
              placeholder="Website 2"
              className="  border-black"
              disabled
            />
          </div>
        </Form.Group> */}
        </Col>
      </Row>
    </div>
  );
};

function Settings() {
  const [showHeading, setShowHeading] = useState("Account information");
  const [selectedComponent, setSelectedComponent] = useState(
    <AccountDetails />
  );

  const SettingsData = ["Account information", "Edit Profile",];

  const handleClick = (item) => {
    setShowHeading(item);
    switch (item) {
      case "Account information":
        setSelectedComponent(<AccountDetails />);
        break;
      case "Edit Profile":
        setSelectedComponent(<ProfilePage />); // Replace with <ChangeEmail /> when available
        break;
      default:
        setSelectedComponent(<AccountDetails />);
    }
  };

  return (
    <div>
      <div className="d-flex mb-3 justify-content-around w-75">
        {SettingsData.map((item, index) => (
          <h6
            key={index}
            onClick={() => handleClick(item)}
            className={showHeading === item ? "text-black" : "text-primary"}
            style={{ cursor: "pointer" }}
          >
            {item}
          </h6>
        ))}
      </div>
      {selectedComponent}
    </div>
  );
}

export default Settings;
