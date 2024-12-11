import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getByIdAPIAction } from "../../store/apiManagementSlice";
import { Card, Button, Row, Col, Spinner } from "react-bootstrap";

function ApiListView() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { dataById, loading } = useSelector((state) => state.apiManagement);

  useEffect(() => {
    if (id) {
      dispatch(getByIdAPIAction(id));
    }
  }, [id, dispatch]);

  return (
    <div className="bg-light min-vh-100 py-5">
      <div className="container">
        {/* Back button and Title */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          {/* Title Centered */}
          <h3 className="text-decoration-underline text-center w-100">
            API Details
          </h3>
          {/* Back Button Right Aligned */}
          <Button variant="secondary" onClick={() => navigate(-1)} className="ms-2">
            Back
          </Button>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Card className="shadow-lg mb-5 w-100">
            <Card.Body>
              <Card.Title className="text-center display-4">{dataById.apiname}</Card.Title>
              <Card.Text className="mb-4">
                <p>
                  <b>Description:</b> {dataById.des}
                </p>
                <p>
                  <b>Backend API Key Name:</b> {dataById.backend_api_key_name}
                </p>
                <p>
                  <b>Standard Pricing:</b> Rs. {dataById.pricing}
                </p>
              </Card.Text>

              <h4 className="text-center mb-4">Fields</h4>

              {/* Fields Grid */}
              <Row className="g-4">
                {dataById?.fields?.map((item, index) => (
                  <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
                    <Card className="shadow-sm hover-card h-100">
                      <Card.Body>
                        <Card.Text className="text-muted">{item}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        )}
      </div>
    </div>
  );
}

export default ApiListView;
