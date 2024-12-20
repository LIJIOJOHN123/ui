import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getByIdAPIAction,
  SkipPrevalidationAction,
} from "../../store/apiResponseManagement";
import {
  Card,
  Button,
  Row,
  Col,
  ListGroup,
  Badge,
  Spinner,
} from "react-bootstrap";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaStopCircle,
} from "react-icons/fa";

function BatchView() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { dataById, loading } = useSelector(
    (state) => state.apiResponseManagement
  );

  useEffect(() => {
    dispatch(getByIdAPIAction(id));
  }, [dispatch, id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center mt-5">
        <Spinner animation="border" variant="primary" />
        <span className="ms-3">Loading...</span>
      </div>
    );
  }

  if (!dataById) {
    return (
      <div className="text-center">
        <h2>Batch Details</h2>
        <p>No data available</p>
      </div>
    );
  }

  const {
    apiType,
    apiStatus,
    status,
    pricing,
    backend_api_key_name,
    apiGroupId,
    createdAt,
    updatedAt,
    prevalidation,
    apiresponse,
    postvalidation,
  } = dataById;

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container-fluid">
        {/* Back Button */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Button
            variant="outline-secondary"
            size="lg"
            onClick={() => navigate(-1)}
          >
            <i className="bi bi-arrow-left-circle"></i> Back
          </Button>
          <h3 className="text-center text-decoration-underline flex-grow-1 display-4">
            API Details
          </h3>
        </div>

        <Row>
          {/* API Details Card */}
          <Col lg={12} className="mb-4">
            <Card className="shadow-lg border-0 rounded-3">
              <Card.Body>
                <Card.Title className="text-center fs-4 mb-3">
                  {apiType} - {apiStatus}
                </Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <strong>Status:</strong>{" "}
                    <Badge bg={status === "ACTIVE" ? "success" : "danger"}>
                      {status}
                    </Badge>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Pricing:</strong> Rs. {pricing}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>API Key Name:</strong> {backend_api_key_name}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>API Group ID:</strong> {apiGroupId}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Created At:</strong>{" "}
                    {new Date(createdAt).toLocaleString()}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Updated At:</strong>{" "}
                    {new Date(updatedAt).toLocaleString()}
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>

          {/* Prevalidation Results Card */}
          <Col lg={12} className="mb-4">
            <Card className="shadow-lg border-0 rounded-3">
              <Card.Body>
                <Card.Title className="fs-4 mb-3 text-center">
                  Prevalidation Results
                </Card.Title>
                {prevalidation && prevalidation.length > 0 ? (
                  <ListGroup variant="flush">
                    {prevalidation.map((validation, index) => {
                      // Set custom styles for each result status
                      let statusStyle = "";
                      let statusIcon = null;
                      let statusBadge = "";
                      let statusColor = "";

                      switch (validation.result) {
                        case "PASSED":
                          statusStyle = "bg-success text-white";
                          statusIcon = (
                            <>
                              <FaCheckCircle
                                className="me-2"
                                style={{ color: "#28a745" }}
                              />
                            </>
                          );
                          statusBadge = "success";
                          break;
                        case "FAILED":
                          statusStyle = "bg-danger text-white";
                          statusIcon = (
                            <FaTimesCircle
                              className="me-2"
                              style={{ color: "#dc3545" }}
                            />
                          );
                          statusBadge = "danger";
                          break;
                        case "PENDING":
                          statusStyle = "bg-warning text-white";
                          statusIcon = (
                            <FaClock
                              className="me-2"
                              style={{ color: "#ffc107" }}
                            />
                          );
                          statusBadge = "warning";
                          break;
                        case "SKIPPED":
                          statusStyle = "bg-secondary text-white";
                          statusIcon = (
                            <FaStopCircle
                              className="me-2"
                              style={{ color: "#6c757d" }}
                            />
                          );
                          statusBadge = "secondary";
                          break;
                        default:
                          statusStyle = "bg-info text-white";
                          statusIcon = (
                            <FaCheckCircle
                              className="me-2"
                              style={{ color: "#17a2b8" }}
                            />
                          );
                          statusBadge = "info";
                          break;
                      }

                      return (
                        <ListGroup.Item
                          key={index}
                          className={`d-flex justify-content-between align-items-center ${statusStyle}`}
                          style={{
                            borderRadius: "0.375rem",
                            marginBottom: "10px",
                          }}
                        >
                          <div className="d-flex align-items-center">
                            {statusIcon}
                            <strong>{validation.message}</strong>
                          </div>
                          <div className="text-end">
                            <p>
                              Status:
                              <Badge bg={statusBadge}>
                                {validation.result}
                              </Badge>
                            </p>
                            <p>
                              Result:{" "}
                              <span className="fw-bold">
                                {validation.result}
                              </span>
                            </p>
                            {validation.result === "FAILED" && (
                              <Button
                                className="btn-success"
                                onClick={() => {
                                  dispatch(
                                    SkipPrevalidationAction(dataById._id)
                                  );
                                  dispatch(getByIdAPIAction(id));
                                }}
                              >
                                Skip
                              </Button>
                            )}
                          </div>
                        </ListGroup.Item>
                      );
                    })}
                  </ListGroup>
                ) : (
                  <div className="text-center">
                    <p className="fs-5 text-muted">
                      No prevalidation results available.
                    </p>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
          {/* Postvalidation Results Card */}
          <Col lg={12} className="mb-4">
            <Card className="shadow-lg border-0 rounded-3">
              <Card.Body>
                <Card.Title className="fs-4 mb-3 text-center">
                  Postvalidation Results
                </Card.Title>
                {postvalidation && postvalidation.length > 0 ? (
                  <ListGroup variant="flush">
                    {postvalidation.map((validation, index) => {
                      // Set custom styles for each result status
                      let statusStyle = "";
                      let statusIcon = null;
                      let statusBadge = "";
                      let statusColor = "";

                      switch (validation.result) {
                        case "PASSED":
                          statusStyle = "bg-success text-white";
                          statusIcon = (
                            <>
                              <FaCheckCircle
                                className="me-2"
                                style={{ color: "#28a745" }}
                              />
                            </>
                          );
                          statusBadge = "success";
                          break;
                        case "FAILED":
                          statusStyle = "bg-danger text-white";
                          statusIcon = (
                            <FaTimesCircle
                              className="me-2"
                              style={{ color: "#dc3545" }}
                            />
                          );
                          statusBadge = "danger";
                          break;
                        case "PENDING":
                          statusStyle = "bg-warning text-white";
                          statusIcon = (
                            <FaClock
                              className="me-2"
                              style={{ color: "#ffc107" }}
                            />
                          );
                          statusBadge = "warning";
                          break;
                        case "SKIPPED":
                          statusStyle = "bg-secondary text-white";
                          statusIcon = (
                            <FaStopCircle
                              className="me-2"
                              style={{ color: "#6c757d" }}
                            />
                          );
                          statusBadge = "secondary";
                          break;
                        default:
                          statusStyle = "bg-info text-white";
                          statusIcon = (
                            <FaCheckCircle
                              className="me-2"
                              style={{ color: "#17a2b8" }}
                            />
                          );
                          statusBadge = "info";
                          break;
                      }

                      return (
                        <ListGroup.Item
                          key={index}
                          className={`d-flex justify-content-between align-items-center ${statusStyle}`}
                          style={{
                            borderRadius: "0.375rem",
                            marginBottom: "10px",
                          }}
                        >
                          <div className="d-flex align-items-center">
                            {statusIcon}
                            <strong>{validation.message}</strong>
                          </div>
                          <div className="text-end">
                            <p>
                              Status:
                              <Badge bg={statusBadge}>
                                {validation.result}
                              </Badge>
                            </p>
                            <p>
                              Result:{" "}
                              <span className="fw-bold">
                                {validation.result}
                              </span>
                            </p>
                            {validation.result === "FAILED" && (
                              <Button
                                className="btn-success"
                                onClick={() => {
                                  dispatch(
                                    SkipPrevalidationAction(dataById._id)
                                  );
                                  dispatch(getByIdAPIAction(id));
                                }}
                              >
                                Skip
                              </Button>
                            )}
                          </div>
                        </ListGroup.Item>
                      );
                    })}
                  </ListGroup>
                ) : (
                  <div className="text-center">
                    <p className="fs-5 text-muted">
                      No prevalidation results available.
                    </p>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>

          {/* API Response Card */}
          <Col lg={12} className="mb-4">
            <Card className="shadow-lg border-0 rounded-3">
              <Card.Body>
                <Card.Title className="fs-4 mb-3">API Response</Card.Title>
                {apiresponse ? (
                  <div>
                    <h5>Raw JSON Data</h5>
                    <pre
                      style={{
                        whiteSpace: "pre-wrap",
                        wordWrap: "break-word",
                        minWidth: "300px" /* Minimum width */,
                        minHeight: "200px" /* Minimum height */,
                        maxHeight: "400px" /* Maximum height */,
                        overflow: "auto" /* Scrollable if content exceeds */,
                        backgroundColor: "#f8f9fa" /* Light background color */,
                        padding: "10px",
                        borderRadius: "5px",
                        boxShadow:
                          "0 2px 5px rgba(0, 0, 0, 0.1)" /* Optional shadow */,
                      }}
                    >
                      {JSON.stringify(apiresponse, null, 2)}
                    </pre>
                  </div>
                ) : (
                  <p>No API response data available.</p>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default BatchView;
