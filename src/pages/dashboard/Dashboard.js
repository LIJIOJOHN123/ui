import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import NavBar from "../layout/NavBar";

// Register the necessary components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement, // Register BarElement
  CategoryScale,
  LinearScale
);

function Dashboard() {
  const data = {
    labels: [
      "2024-08-04",
      "2024-08-05",
      "2024-08-06",
      "2024-08-07",
      "2024-08-08",
    ], // Dates as labels
    datasets: [
      {
        label: "Account Usage Summary",
        data: [10, 20, 15, 25, 10], // Sample values
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)", // Color for 2024-08-04
          "rgba(255, 99, 132, 0.2)", // Color for 2024-08-05
          "rgba(255, 159, 64, 0.2)", // Color for 2024-08-06
          "rgba(75, 192, 192, 0.2)", // Color for 2024-08-07
          "rgba(153, 102, 255, 0.2)", // Color for 2024-08-08
        ], // Background color of bars
        //  borderColor: [
        //    "rgb(75, 192, 192)", // Border color for 2024-08-04
        //    "rgb(255, 99, 132)", // Border color for 2024-08-05
        //    "rgb(255, 159, 64)", // Border color for 2024-08-06
        //    "rgb(75, 192, 192)", // Border color for 2024-08-07
        //    "rgb(153, 102, 255)", // Border color for 2024-08-08
        //  ], // Border color of bars
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `Value: ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Value",
        },
        beginAtZero: true, // Ensure the y-axis starts at zero
      },
    },
  };

  return (
    <>
      <Row className="">
        <Col
          md={2}
          className="bg-danger   border rounded-1 border-1  d-flex flex-column justify-content-center align-items-center"
          style={{ height: "60px" }}
        >
          <div className="text-center">
            <h6 className="text-white mb-1">15,100 / 499,988</h6>
            <p className="text-white mb-0" style={{ fontSize: "14px" }}>
              Recent API usage
            </p>
          </div>
        </Col>
        <Col
          md={5}
          className="bg-body-secondary border rounded-1 border-1 d-flex flex-column justify-content-center align-items-center"
          style={{ height: "60px" }}
        >
          <div className="text-center">
            <h6 className="fw-bold mb-1">13500</h6>
            <p className="mb-0" style={{ fontSize: "14px" }}>
              WEB RISK URLS
            </p>
          </div>
        </Col>
        <Col
          md={5}
          className="bg-body-secondary border rounded-1 border-1 d-flex flex-column justify-content-center align-items-center"
          style={{ height: "60px" }}
        >
          <div className="text-center">
            <h6 className="fw-bold mb-1">16,000</h6>
            <p className="mb-0" style={{ fontSize: "14px" }}>
              API URLS
            </p>
          </div>
        </Col>
      </Row>

      <Row className="mx-4" style={{ margin: "30px 90px" }}>
        <Col
          style={{ height: "110px" }}
          className="border me-3 rounded-1 text-center border-black py-2"
        >
          <h4>Upload URLs in Bulk</h4>
          <p style={{ fontSize: "12px" }} className="fw-normal mx-2">
            Do you have data we can enrich? Easily upload website URLs to
            quickly scan web or app URLs without any integration.
          </p>
          <Button
            variant="danger"
            style={{ width: "150px", fontSize: "14px", marginTop: "-10px" }}
          >
            Upload CSV Files
          </Button>
        </Col>
        <Col
          style={{ height: "110px" }}
          className="border me-3 rounded-1 text-center border-black py-2"
        >
          <h4>API Integration</h4>
          <p style={{ fontSize: "12px" }} className="fw-normal mx-2">
            Perform advanced risk analysis and reputation checks with a robust
            API that can access merchant’s website presence.
          </p>
          <Button
            variant="danger"
            style={{ width: "150px", fontSize: "14px", marginTop: "-10px" }}
          >
            View API Docs
          </Button>
        </Col>
      </Row>

      <div className="d-flex justify-content-end" style={{ fontSize: "14px" }}>
        <select className="me-2">
          <option>ACCOUNT USAGE SUMMARY for Web URLs</option>
        </select>
        <select style={{ marginRight: "100px", width: "250px" }}>
          <option>THIS WEEK</option>
        </select>
      </div>

      <Row className="w-100">
        <Col className="mt-4 mx-4">
          <h5>Lookups & API Calls</h5>
          <p style={{ fontSize: "14px" }}>Based on estimated activity</p>

          <Bar data={data} options={options} />
          <h6>ACCOUNT SUMMARY: THIS WEEK FOR WEB RISK MONITORING</h6>
        </Col>
        <Col
          style={{ height: "110px", marginTop: "100px", marginRight: "100px" }}
          className="border rounded-1 text-center border-black py-2"
        >
          <h4>Free Credits will Expire Soon!</h4>
          <p style={{ fontSize: "12px" }} className="fw-normal mx-2">
            Upgrade your plan to continue using our APIs without hassle.
          </p>
          <Button
            variant="danger"
            style={{ width: "150px", fontSize: "14px", marginTop: "15px" }}
          >
            Upgrade Plan
          </Button>
        </Col>
      </Row>
    </>
  );
}

export default Dashboard;
