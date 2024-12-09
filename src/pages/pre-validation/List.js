import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Form, Pagination, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteValidation,
  fetchValidations,
} from "../../store/prevalidationSlice";
import ValidationSearchPopup from "./SearchInput";

function PreValidationList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, loading, count, error } = useSelector(
    (state) => state.prevalidation
  );

  // /////////

  const [searchQueries, setSearchQueries] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);

  console.log(searchQueries);
  const queryString = Object.entries(searchQueries)
    .filter(([_, value]) => value !== "")
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  useEffect(() => {
    dispatch(fetchValidations(page, limit, queryString));
  }, [page, limit, dispatch, queryString]);

  const totalPages = Math.ceil(count / limit);

  const handleLimitChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setLimit(value);
    setPage(1);
  };

  // ///////////

  const handleDelete = (id) => {
    dispatch(deleteValidation(id));
  };

  return (
    <div>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center mt-5">
          <div className="spinner-grow" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      ) : (
        <div>
          <div className="d-flex justify-content-between align-items-center">
            <h3>Pre-Validation</h3>
            <Button
              onClick={() => navigate("/pre-validation/create")}
              variant="primary"
              className="fw-bold"
            >
              Add Validation
            </Button>
          </div>

          <div className="d-flex align-items-center mt-3">
            <p className="mb-0 me-3">
              Total: <b>{count}</b>
            </p>
            <div className="d-flex align-items-center me-3">
              <label htmlFor="limit" className="me-2">
                Record(s) per Page :
              </label>
              <Form.Select
                id="limit"
                className="form-select w-auto"
                value={limit}
                onChange={handleLimitChange}
              >
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </Form.Select>
            </div>

            <ValidationSearchPopup setSearchQueries={setSearchQueries} />
          </div>
          <div className="d-flex flex-column min-vh-100">
            <div className="flex-grow-2">
              <Row className="mt-4">
                {data && data.length > 0 ? (
                  data.map((item, i) => (
                    <Col key={i} xs={12} sm={6} md={4} lg={3} className="mb-4">
                      <div className="bg-info p-2 rounded-3 h-100">
                        <div
                          className="cursor-pointer"
                          onClick={() =>
                            navigate(`/pre-validation/${item._id}`)
                          }
                        >
                          <h6>{item.name}</h6>
                          <p className="line-clamp">
                            {item.des || "No Description"}
                          </p>
                        </div>
                        <div className="mt-3 d-flex justify-content-between">
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDelete(item._id)}
                          >
                            Delete
                          </Button>
                          <Button
                            variant="warning"
                            size="sm"
                            onClick={() =>
                              navigate(`/pre-validation/edit/${item._id}`)
                            }
                          >
                            Edit
                          </Button>
                        </div>
                      </div>
                    </Col>
                  ))
                ) : (
                  <div className="text-center w-100 mt-4">
                    <h5>No validations found.</h5>
                  </div>
                )}
              </Row>
            </div>
            {/* Pagination */}
            <div className="mt-auto">
              <Pagination className="d-flex justify-content-center">
                <Pagination.Prev
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                />
                {[...Array(totalPages)].map((_, idx) => (
                  <Pagination.Item
                    key={idx}
                    active={page === idx + 1}
                    onClick={() => setPage(idx + 1)}
                  >
                    {idx + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                />
              </Pagination>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PreValidationList;
