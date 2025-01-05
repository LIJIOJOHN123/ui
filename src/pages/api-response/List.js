import React, { useEffect, useState } from "react";
import { Form, Table, Pagination, Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { apiBatchingAction } from "../../store/apiResponseManagement";
import ApiResponseSearchPopup from "./SearchInput";

// Modular Table Row Component
const BatchTableRow = ({ item, navigate }) => (
  <tr>
    <td className="text-center align-middle">
      <Button
        variant="link"
        className="p-0 text-primary"
        onClick={() => navigate(`/products/batch-details-view/${item._id}`)}
        aria-label={`View details for ${item._id}`}
      >
        <i className="bi bi-eye-fill"></i>
      </Button>
    </td>
    <td className="text-center align-middle">{item.job_id}</td>
    <td className="text-center align-middle">{item.apiType}</td>
    <td className="text-center align-middle">{item.backend_api_key_name}</td>
    <td className="text-center align-middle">{item.pricing}</td>
    <td className="text-center align-middle">{item.apiStatus}</td>
    <td className="text-center align-middle">
      {item.apiStatus === "API FAILED" ? (
        <Button variant="danger" size="sm">Retrigger</Button>
      ) : (
        <span className="text-success">✔</span>
      )}
    </td>
  </tr>
);

function ApiResponse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [searchQueries, setSearchQueries] = useState({});

  // Fetching data from Redux store
  const { data = [], count = 0, loading } = useSelector(
    (state) => state.apiResponseManagement
  );

  // Constructing query string
  const queryString = Object.entries(searchQueries)
    .filter(([_, value]) => value !== "")
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  useEffect(() => {
    dispatch(apiBatchingAction(page, limit, queryString));
  }, [dispatch, page, limit, queryString]);

  const totalPages = Math.ceil(count / limit);

  const handleLimitChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setLimit(value);
    setPage(1);
  };

  return (
    <div className="container-fluid d-flex flex-column min-vh-100 py-4" style={{ margin: "0 auto" }}>
      <h2 className="text-center mb-4">API Responses</h2>

      {/* Filters and Search */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center">
          <p className="mb-0 me-3">
            <strong>Total:</strong> {count}
          </p>

          <div className="d-flex align-items-center me-3">
            <label htmlFor="limit" className="me-2">
              Records per Page:
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
        </div>

        <ApiResponseSearchPopup setSearchQueries={setSearchQueries} />
      </div>

      {/* Table */}
      <div className="table-responsive">
        <Table striped bordered hover size="sm">
          <thead className="table-light">
            <tr>
              <th>View</th>
              <th>Job ID</th>
              <th>API Type</th>
              <th>Key Name</th>
              <th>Pricing</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center">
                  <Spinner animation="border" variant="primary" />
                </td>
              </tr>
            ) : data.length > 0 ? (
              data.map((item) => (
                <BatchTableRow key={item._id} item={item} navigate={navigate} />
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center text-muted">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination>
            <Pagination.Prev
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            />
            {[...Array(totalPages).keys()].slice(0, 3).map((num) => (
              <Pagination.Item
                key={num}
                active={page === num + 1}
                onClick={() => setPage(num + 1)}
              >
                {num + 1}
              </Pagination.Item>
            ))}
            {page > 4 && <Pagination.Ellipsis disabled />}
            {page > 3 && page < totalPages - 2 && (
              <Pagination.Item active>{page}</Pagination.Item>
            )}
            {page < totalPages - 2 && <Pagination.Ellipsis disabled />}
            {[totalPages - 1, totalPages].map((num) => (
              <Pagination.Item
                key={num}
                active={page === num}
                onClick={() => setPage(num)}
              >
                {num}
              </Pagination.Item>
            ))}
            <Pagination.Next
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            />
          </Pagination>
        </div>
      )}
    </div>
  );
}

export default ApiResponse;
