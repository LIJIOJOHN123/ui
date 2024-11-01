import React, { useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { apiListAction, deleteApiAction } from "../../store/apiSlice";

function ApiList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, loading, count } = useSelector((state) => state.apiList);
  console.log(data);
  useEffect(() => {
    dispatch(apiListAction());
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
          <div className="d-flex justify-content-between align-items-center">
            <h3>API List</h3>
            <Button
              onClick={() => navigate("/api-list/create")}
              variant="primary"
              className="fw-bold"
            >
              Add API
            </Button>
          </div>
          {count}
          <Row className="mt-4">
            {data &&
              data.map((item, i) => (
                <Col key={i} xs={12} sm={6} md={4} lg={3} className="mb-4">
                  <div className="bg-info p-2 rounded-3 h-100">
                    <h6>{item.apiname}</h6>
                    <p className="line-clamp">{item.des}</p>
                    <b>${item.pricing}</b>
                    <div>
                      {item.fields &&
                        item.fields.map((field, index) => (
                          <p key={index}>{field}</p>
                        ))}
                    </div>
                    <div className="mt-3">
                      <Button
                        onClick={() => dispatch(deleteApiAction(item._id))}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </Col>
              ))}
          </Row>
        </div>
      )}
    </div>
  );
}

export default ApiList;
