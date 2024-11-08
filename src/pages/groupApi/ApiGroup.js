import React, { useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { apiGroupAction, deleteAPIGroupAction } from "../../store/groupSlice";

function ApiGroup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, loading, count } = useSelector((state) => state.groupApi);

  useEffect(() => {
    dispatch(apiGroupAction());
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
            <h3>API Group</h3>
            <Button
              onClick={() => navigate("/api-group/create")}
              variant="primary"
              className="fw-bold"
            >
              Add API Group
            </Button>
          </div>
          {count}
          <Row className="mt-4">
            {data &&
              data.map((item, i) => (
                <Col key={i} xs={12} sm={6} md={4} lg={3} className="mb-4">
                  <div className="bg-info p-2 rounded-3 h-100">
                    <div onClick={() => navigate(`/api-group/${item._id}`)}>
                      <h6>{item.name}</h6>
                      <p className="line-clamp">{item.des}</p>
                      <b>${item.pricing}</b>
                    </div>
                    <div className="mt-3 " style={{ zIndex: 10 }}>
                      <Button
                        onClick={() => dispatch(deleteAPIGroupAction(item._id))}
                      >
                        Delete
                      </Button>
                      <Button
                        onClick={() => navigate(`/api-group/edit/${item._id}`)}
                      >
                        Edit
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

export default ApiGroup;
