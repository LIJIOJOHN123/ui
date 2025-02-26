import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { dashBoardUsageAction, uploadCSVAPIBatchingAction } from "../../store/apiResponseManagement";
import { darsbordChartListAction } from "../../store/paymentSlice";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

function Dashboard() {
  const fileInputRef = useRef(null);
  const [usage, setUsage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const { data: chartdata } = useSelector((state) => state.payment)
  useEffect(() => {
    const data = { days: usage };
    dispatch(darsbordChartListAction(data));
  }, [usage]);

  useEffect(() => {
    dispatch(dashBoardUsageAction());
  }, [])
  const { dashBoardUsage } = useSelector((state) => state.apiResponseManagement);

  const datas = {
    labels: chartdata?.map((item) => item.date),
    datasets: [
      {
        label: "Account Usage Summary",
        data: chartdata?.map((item) => item.count),
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)",
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderWidth: 1,
        barThickness: 60,
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
          text: "Days"
        },
      },
      y: {
        title: {
          display: true,
          text: "Value",
        },
        beginAtZero: true,
      },
    },
  };



  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);

      // Automatically trigger upload after file selection
      const formData = new FormData();
      formData.append("file", file);
      dispatch(uploadCSVAPIBatchingAction({ formData }));
      navigate("/client-batch");
    } else {
      toast.error("Please select a CSV file to upload.");
    }
  };
  const handleFileClick = () => {
    navigate('/client-batch'); 
  };
  const totalRequest = dashBoardUsage?.payment?.totalrequest || 0;
  const balance = dashBoardUsage?.payment?.balance || 0;
  const used = totalRequest - balance;
  return (
    <>
      <Row className="">
        <Col

          className="bg-danger   border rounded-1 border-1  d-flex flex-column justify-content-center align-items-center"
          style={{ height: "60px" }}
        >
          <div className="text-center">
            <h6 className="text-white mb-1">
            {`${used} / ${totalRequest}`}
            </h6>
            <p className="text-white mb-0" style={{ fontSize: "14px" }}>
              Recent API usage
            </p>
          </div>
        </Col>
        {/* <Col
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
        </Col> */}
        <Col

          className="bg-body-secondary border rounded-1 border-1 d-flex flex-column justify-content-center align-items-center"
          style={{ height: "60px" }}
        >
          <div className="text-center">
            <h6 className="fw-bold mb-1">{dashBoardUsage?.usage?.length}</h6>
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
          <div onClick={handleFileClick} style={{ cursor: "pointer" }}>
          <>
          <h4>Upload URLs in Bulk</h4>
          <p style={{ fontSize: "12px" }} className="fw-normal mx-2">
            Do you have data we can enrich? Easily upload website URLs to
            quickly scan web or app URLs without any integration.
          </p>
        </>
          </div>
          {/* <div onClick={() => fileInputRef.current.click()} style={{ cursor: "pointer" }}>
            {selectedFile ? (<p className="my-4 mb-5">{selectedFile.name}</p>) : (<><h4 >Upload URLs in Bulk</h4>
              <p style={{ fontSize: "12px" }} className="fw-normal mx-2">
                Do you have data we can enrich? Easily upload website URLs to
                quickly scan web or app URLs without any integration.
              </p></>)}

          </div> */}
          {/* <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileUpload}
            accept=".csv"
          /> */}
          <Button
            variant="danger"
            style={{ width: "150px", fontSize: "14px", marginTop: "-10px" }}
            onClick={() => fileInputRef.current.click()} // Remove handleUpload from here
          >
            Upload CSV Files
          </Button>

        </Col>
        <Col
          style={{ height: "110px" }}
          className="border me-3 rounded-1 text-center border-black py-2"
        >
          <h4 >API Integration</h4>
          <p style={{ fontSize: "12px" }} className="fw-normal mx-2">
            Perform advanced risk analysis and reputation checks with a robust
            API that can access merchant’s website presence.
          </p>
          <Button
            onClick={() => navigate("/api_document")}
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
        <select
          onChange={(e) => setUsage(Number(e.target.value))}
          style={{ marginRight: "100px", width: "250px" }}
        >
          <option value={7}>Last 7 days</option>
          <option value={30}>Last 30 days</option>
        </select>

      </div>

      <Row className="">
        <Col className="mt-4 mx-4">
          <h5>Lookups & API Calls</h5>
          <p style={{ fontSize: "14px" }}>Based on estimated activity</p>

          <Bar data={datas} options={options} />
          <h6 className="text-center">ACCOUNT SUMMARY: THIS WEEK FOR WEB RISK MONITORING</h6>
        </Col>
        {/* <Col
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
        </Col> */}
      </Row>
    </>
  );
}

export default Dashboard;
