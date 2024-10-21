import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import logo from "../../assets/Background.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Bell, Mail, Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { logOut } from "../../store/authSlice";

function NavBar({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const handleNavigation = (path) => {

    if (path === "/auth/login") {
      localStorage.clear("authToken")
      localStorage.clear("user")
      dispatch(logOut())
    }
    navigate(path)

  }
  const navItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Batch Enrichment (CSV)", path: "/batch-enrichment" },
    { label: "Documentation", path: "/documentation" },
    { label: "Plans", path: "/plans" },
    { label: "Settings", path: "/settings" },
    { label: "Logout", path: "/auth/login" },
  ];

  return (
    <div className="bg-black container-fluid p-0">
      {/* Top Navigation Bar */}
      <Row
        className="align-items-center justify-content-between mx-0"
        style={{ height: "50px" }}
      >
        <Col className="d-flex align-items-center pt-1">
          <Link to="/dashboard">
            <img
              src={logo}
              alt="logo"
              style={{ objectFit: "contain", width: "130px" }}
            />
          </Link>
        </Col>
        <Col xs="auto" className="d-flex align-items-stretch gap-1 my-2">
          <div className="d-flex  align-items-center ">
            <Bell className="text-warning" />
            <span
              className=" translate-middle bg-success  rounded-circle text-center"
              style={{ fontSize: "0.75rem", width: "18px", height: "18px" }}
            >
              2
            </span>
          </div>

          <div className="d-flex justify-content-center align-items-center">
            <Search className="text-white" />
          </div>

          <div className="d-flex justify-content-center align-items-center mx-3">
            <Mail className="text-white" />
          </div>
          <Link to="/plans" className="text-decoration-none">
            <Button
              style={{
                backgroundColor: "gray",
                padding: "10px 25px",
                minWidth: "120px",
              }}
              className="border-0 d-flex align-items-center justify-content-center"
            >
              Plan
            </Button>
          </Link>
          <Link to="/auth/login" className="text-decoration-none">
            <Button
              variant="danger"
              style={{ padding: "10px 25px", minWidth: "120px" }}
              className="fw-bold d-flex align-items-center justify-content-center border-0"
              onClick={() => handleNavigation("/auth/login")}
            >
              Logout
            </Button>
          </Link>
        </Col>
      </Row>

      {/* Content Section */}
      <Row className="mt-3 mx-0">
        <Col
          md={2}
          className="vh-100 bg-black text-white d-flex flex-column align-items-center"
        >
          <img
            className="w-50"
            style={{ borderRadius: "200px" }}
            src="https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?w=740&t=st=1723811714~exp=1723812314~hmac=264cf4b222d991caf3459db719571b65cb1f5d98d462e1cb3aebd0bf5a4d2334"
            alt="Profile"
          />
          <h5 className="mt-3">Sudhir Sukrutharaj</h5>
          <div className="w-100 mt-4 d-flex flex-column">
            {navItems.map((item) => (

              <Button
                key={item.label}
                variant={location.pathname === item.path ? "warning" : "dark"}
                className="w-100 mb-2"
                onClick={() => handleNavigation(item.path)}
              >
                {item.label}
              </Button>

            ))}
          </div>
        </Col>
        <Col className="bg-light p-0">{children}</Col>
      </Row>
    </div>
  );
}

export default NavBar;
