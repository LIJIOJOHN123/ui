import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getByIdAPIAction } from "../../store/apiGroupManagementSlice";
import { Button, Col, Row, Card, Badge, ListGroup, Spinner } from "react-bootstrap";

function ApiListView() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dataById, loading } = useSelector((state) => state.apiGroupManagement);

  useEffect(() => {
    if (id) {
      dispatch(getByIdAPIAction(id));
    }
  }, [id, dispatch]);

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container-fluid">
        {/* Back Button and Title */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="text-center text-decoration-underline flex-grow-1 display-4">
            API Details
          </h3>
          {/* Move Back button to the right */}
          <Button
            variant="secondary"
            onClick={() => navigate(-1)}
            className="d-flex align-items-center shadow-sm border-0 px-3 py-2"
          >
            <i className="bi bi-arrow-left-circle me-2"></i> Back
          </Button>
        </div>

        {/* Loading Spinner */}
        {loading ? (
          <div className="d-flex justify-content-center align-items-center mt-5">
            <Spinner animation="border" variant="primary" />
            <span className="ms-3">Loading...</span>
          </div>
        ) : (
          <>
            {/* Full-Width Card */}
            <Card className="shadow-lg mb-4 border-0 rounded-3 w-100">
              <Card.Body>
                <Card.Title className="text-center fs-3 fw-bold mb-3">
                  {dataById.name}
                </Card.Title>
                <Card.Text>
                  <p>
                    <strong>Description:</strong> {dataById.description}
                  </p>
                  {dataById.field_active && (
                    <p>
                      <strong>Fields:</strong> {dataById.fields[0]}
                    </p>
                  )}
                  <h4 className="mt-4 text-center">API List</h4>

                  {/* Grid for API Cards */}
                  <Row className="g-4">
                    {dataById?.apiId?.map((api, index) => (
                      <Col
                        key={index}
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                        className="mb-4 d-flex align-items-stretch"
                      >
                        <Card className="shadow-sm h-100 border-0 rounded-3 hover-card">
                          <Card.Body>
                            <Card.Title className="text-center fs-5 fw-bold mb-3">
                              {api.apiname}
                            </Card.Title>
                            <Card.Text className="text-muted">{api.des}</Card.Text>
                            <ListGroup variant="flush">
                              <ListGroup.Item>
                                <strong>Pricing:</strong> ${api.pricing}
                              </ListGroup.Item>
                              <ListGroup.Item>
                                <strong>API Key Name:</strong> {api.backend_api_key_name}
                              </ListGroup.Item>
                              <ListGroup.Item>
                                <strong>Status:</strong>
                                <Badge bg={api.status === "ACTIVE" ? "success" : "danger"}>
                                  {api.status}
                                </Badge>
                              </ListGroup.Item>
                            </ListGroup>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </Card.Text>
              </Card.Body>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}

export default ApiListView;
