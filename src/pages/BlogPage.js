import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import img from "../assets/comingSoon.png";
function BlogPage() {
  return (
    <div
      className="pb-sm-3 "
      id="/"
      style={{
        display: "flex",
        background: "linear-gradient(to bottom, #420394, #000000)",
        height: "100vh",
      }}
    >
      <div
        className="container mt-5"
        style={{ width: "90%", maxWidth: "1200px" }}
      >
        <NavBar />
        <div className="d-flex mt-5 flex-column align-items-center justify-content-center">
          <img
            className="img-fluid w-25 d-flex align-items-center justify-content-center"
            src={img}
            alt="Blog"
          />
          <Link to={"/"} className="text-decoration-none btn btn-dark mt-3">
            Home Page
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BlogPage;
