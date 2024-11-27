import React, { useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { planAction, deleteplanAction } from "../../store/planSlice";

function PlanList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, loading, count } = useSelector((state) => state.plan);

  useEffect(() => {
    if (!data.length && !loading) {
      dispatch(planAction());
    }
  }, [dispatch]);

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
          <p>Total Plans: {count}</p>
          <Row className="mt-4">
            {!data.length ? (
              <div>No plans available</div>
            ) : (
              data.map((item) => (
                <Col
                  key={item._id}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  className="mb-4"
                >
                  <div className="bg-info p-3 rounded-3 h-100">
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate(`/api-list/${item._id}`)}
                    >
                      <h6>{item.name}</h6>
                      <p>{item.des}</p>
                      <b>${item.pricing}</b>
                      {item.apiId?.map((field) => (
                        <p key={field.apiId}>
                          {field.apiId}: {field.discoutedPrice}
                        </p>
                      ))}
                    </div>
                    <div className="mt-3">
                      <Button
                        variant="danger"
                        className="me-2"
                        onClick={() => dispatch(deleteplanAction(item._id))}
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
