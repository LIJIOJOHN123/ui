import React, { useEffect, useState } from "react";
import { Button, Col, Form, Pagination, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteApiGroupAction,
  ApiGroupAction,
} from "../../store/apiGroupManagementSlice";
import APiGroupSearch from "./APiGroupSearch";

function APIGroupList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, loading, count } = useSelector(
    (state) => state.apiGroupManagement
  );

  const [searchQueries, setSearchQueries] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const queryString = Object.entries(searchQueries)
    .filter(([_, value]) => value !== "")
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  useEffect(() => {
    dispatch(ApiGroupAction(page, limit, queryString));
  }, [page, limit, dispatch, queryString]);

  const totalPages = Math.ceil(count / limit);
  const handleLimitChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setLimit(value);
    setPage(1);
  };
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
              onClick={() => navigate("/api-groups/create")}
              variant="primary"
              className="fw-bold"
            >
              Add group
            </Button>
          </div>
          {count}
          <Row className="mt-4">
            {data &&
              data.map((item, i) => (
                <Col key={i} xs={12} sm={6} md={4} lg={3} className="mb-4">
                  <div className="bg-info p-2 rounded-3 h-100">
                    <div onClick={() => navigate(`/api-groups/${item._id}`)}>
                      <h6>{item.name}</h6>
                      <p className="line-clamp">{item.description}</p>
                    </div>
                    <div className="mt-3 " style={{ zIndex: 10 }}>
                      <Button
                        onClick={() => dispatch(deleteApiGroupAction(item._id))}
                      >
                        Delete
                      </Button>
                      <Button
                        onClick={() => navigate(`/api-groups/edit/${item._id}`)}
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

export default APIGroupList;
