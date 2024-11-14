import React, { useEffect, useState } from "react";
import { Button, Col, Form, InputGroup, Nav, Row, Tab } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CryptoJS from "crypto-js";
import { updateUserAction } from "../../store/authSlice";

const ProfilePage = () => {
  const [key, setKey] = useState("profile");

  const [activeTabContent, setActiveTabContent] = useState(<ProfileTab />);

  const handleSelect = (k) => {
    setKey(k);
    switch (k) {
      case "profile":
        setActiveTabContent(<ProfileTab />);
        break;
      case "changeEmail":
        setActiveTabContent(<ChangeEmailTab />);
        break;
      case "changePassword":
        setActiveTabContent(<ChangePasswordTab />);
        break;
      default:
        setActiveTabContent(<ProfileTab />);
    }
  };

  return (
    <div>
      <h2>Profile</h2>
      <Nav variant="tabs" activeKey={key} onSelect={handleSelect}>
        <Nav.Item>
          <Nav.Link eventKey="profile">Profile</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="changeEmail">Change Email</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="changePassword">Change Password</Nav.Link>
        </Nav.Item>
      </Nav>
      <Tab.Content>
        <div className="mt-3">{activeTabContent}</div>
      </Tab.Content>
    </div>
  );
};

const ProfileTab = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    company: "",
    country: "",
    website: "",
    oldpassword: "",
  });

  const [error, setError] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const { loading, isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      setFormData((prev) => ({ ...prev, ...user }));
    }
  }, [isAuthenticated, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const changedFields = {};
    for (const key in formData) {
      if (key !== "oldpassword" && formData[key] !== user[key]) {
        changedFields[key] = formData[key];
        setError("");
      }
    }
    if (Object.keys(changedFields).length === 0) {
      setError("No changes detected to submit.");
      return;
    }
    const encryptedPassword = CryptoJS.AES.encrypt(
      formData.oldpassword,
      process.env.REACT_APP_SECRET_KEY
    ).toString();

    const encryptedFormData = {
      ...formData,
      oldpassword: encryptedPassword,
    };

    dispatch(updateUserAction(encryptedFormData));
    setFormData({ oldpassword: "" });
  };

  return (
    <Form className="z-2" onSubmit={handleSubmit}>
      <Row>
        <Col md={8}>
          <Form.Group className="mb-2" controlId="formName">
            <Form.Label className="m-0">Name</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Name"
                className="border-1 border-black"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-2" controlId="formPhone">
            <Form.Label className="m-0">Phone Number</Form.Label>
            <InputGroup>
              <Form.Control
                type="number"
                placeholder="Phone Number"
                className="border-1 border-black"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-2" controlId="formCompany">
            <Form.Label className="m-0">Company</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Company"
                className="border-1 border-black"
                name="company"
                value={formData.company}
                onChange={handleChange}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-2" controlId="formCountry">
            <Form.Label className="m-0">Country</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Country"
                className="border-1 border-black"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-2" controlId="formDomains">
            <Form.Label className="m-0">website</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="website"
                className="border-1 border-black"
                name="website"
                value={formData.website}
                onChange={handleChange}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-2 mt-5" controlId="formDomains">
            <Form.Label className="m-0">Password</Form.Label>
            <InputGroup>
              <Form.Control
                type="password"
                placeholder="password"
                className="border-1 border-black"
                name="oldpassword"
                value={formData.oldpassword}
                onChange={handleChange}
                required
              />
            </InputGroup>
          </Form.Group>
        </Col>
        {error && <p className="text-danger">{error}</p>}
      </Row>
      <Button type="submit">
        {loading ? <div className="spinner-border " /> : <div>Submit</div>}
      </Button>
    </Form>
  );
};

const ChangeEmailTab = () => {
  const [formData, setFormData] = useState({
    email: "",
    newEmail: "",
    oldpassword: "",
  });
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { loading, isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      setFormData((prev) => ({ ...prev, ...user }));
    }
  }, [isAuthenticated, user]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.newEmail === "") {
      setError("No changes detected to submit.");
      return;
    }
    const encryptedPassword = CryptoJS.AES.encrypt(
      formData.oldpassword,
      process.env.REACT_APP_SECRET_KEY
    ).toString();

    const encryptedFormData = {
      email: formData.newEmail,
      oldpassword: encryptedPassword,
    };

    dispatch(updateUserAction(encryptedFormData));
    setFormData({ newEmail: "", oldpassword: "" });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={8}>
          <Form.Group className="mb-2" controlId="formEmail">
            <Form.Label className="m-0">Current Email</Form.Label>
            <InputGroup>
              <Form.Control
                type="email"
                placeholder="E-Mail Address"
                className="border-1 border-black"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-2" controlId="formNewEmail">
            <Form.Label className="m-0">New Email</Form.Label>
            <InputGroup>
              <Form.Control
                type="email"
                placeholder="New E-Mail Address"
                className="border-1 border-black"
                name="newEmail"
                value={formData.newEmail}
                onChange={handleChange}
                required
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mt-5" controlId="formDomains">
            <Form.Label className="m-0">Password</Form.Label>
            <InputGroup>
              <Form.Control
                type="password"
                placeholder="password"
                className="border-1 border-black"
                name="oldpassword"
                value={formData.oldpassword}
                onChange={handleChange}
                required
              />
            </InputGroup>
          </Form.Group>
        </Col>
      </Row>
      {error && error}
      <Button type="submit" className="mt-3">
        {loading ? <div className="spinner-border " /> : <div>Submit</div>}
      </Button>
    </Form>
  );
};

const ChangePasswordTab = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    password: "",
    oldPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const { loading } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.oldPassword === "" || formData.password === "") {
      setError("Please enter Password.");
      return;
    }
    const encryptedPassword = CryptoJS.AES.encrypt(
      formData.password,
      process.env.REACT_APP_SECRET_KEY
    ).toString();
    const encryptedoldPassword = CryptoJS.AES.encrypt(
      formData.oldPassword,
      process.env.REACT_APP_SECRET_KEY
    ).toString();
    setError("");
    const encryptedFormData = {
      password: encryptedPassword,
      oldpassword: encryptedoldPassword,
    };

    dispatch(updateUserAction(encryptedFormData));
    setFormData({ oldPassword: "", password: "" });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={8}>
          <Form.Group className="mb-2 mt-5" controlId="formPassword">
            <Form.Label className="m-0">Current Password</Form.Label>
            <InputGroup>
              <Form.Control
                type="password"
                placeholder="oldPassword"
                className="border-1 border-black"
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleChange}
                required
              />
            </InputGroup>
          </Form.Group>

          <Form.Group className="mb-2" controlId="formNewPassword">
            <Form.Label className="m-0">New Password</Form.Label>
            <InputGroup>
              <Form.Control
                type="password"
                placeholder="New Password"
                className="border-1 border-black"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </InputGroup>
          </Form.Group>
          {error && <p className="text-danger">{error}</p>}
        </Col>
      </Row>
      <Button type="submit">
        {loading ? <div className="spinner-border " /> : <div>Submit</div>}
      </Button>
    </Form>
  );
};

export default ProfilePage;
