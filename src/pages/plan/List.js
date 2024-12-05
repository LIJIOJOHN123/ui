import React, { useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteplanAction, planAction } from "../../store/planSlice";

function PlanList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Extracting state from Redux
  const { data, loading, count } = useSelector((state) => state.plan);

  useEffect(() => {
    dispatch(planAction());
  }, []);


  return (
    <div>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center mt-5">
          <div className="spinner-grow" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div>
          {/* Header Section */}
          <div className="d-flex justify-content-between align-items-center">
            <h3>Plans</h3>
            <Button
              onClick={() => navigate("/plan/create")}
              variant="primary"
              className="fw-bold"
            >
              Add Plans
            </Button>
          </div>
          <p>Total Plans: {count || 0}</p>

          {/* Plan List */}
          <Row className="mt-4">
            {data.length === 0 ? (
              <div>No data available</div>
            ) : (
              data.map((item, i) => (
                <Col key={i} xs={12} sm={6} md={4} lg={3} className="mb-4">
                  <div className="bg-info p-2 rounded-3 h-100">
                    {/* Plan Details */}
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate(`/api-list/${item._id}`)}
                    >
                      <h6>{item.name}</h6>
                      <p className="line-clamp">{item.des}</p>
                      <b>${item.pricing}</b>
                      <div>
                        {item.apiId &&
                          item.apiId.map((field, index) => (
                            <p key={index}>
                              {field.apiId}: {field.discoutedPrice}
                            </p>
                          ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-3">
                      <Button
                        variant="danger"
                        onClick={() => dispatch(deleteplanAction(item._id))}
                        className="me-2"
                      >
                        Delete
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => navigate(`/plan/edit/${item._id}`)}
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                </Col>
              ))
            )}
          </Row>
        </div>
      )}
    </div>
  );
}

export default PlanList;
