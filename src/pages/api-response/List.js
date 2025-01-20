import React, { useEffect, useState } from "react";
import { Form, Table, Pagination, Button, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  apiBatchingAction,
  retriggerBatchingAction,
} from "../../store/apiResponseManagement";
import ApiResponseSearchPopup from "./SearchInput";

const LOCAL_STORAGE_LIMIT_KEY = "apiResponseLimit";

const BatchTableRow = ({ item, navigate, dispatch }) => (
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
      <Button
        size="sm"
        variant="danger"
        onClick={() => {
          dispatch(retriggerBatchingAction(item._id));
        }}
      >
        Retrigger
      </Button>
    </td>
  </tr>
);

function ApiResponse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  const initialLimit =
    parseInt(localStorage.getItem(LOCAL_STORAGE_LIMIT_KEY), 10) || 25;
  const [limit, setLimit] = useState(initialLimit);

  const [searchQueries, setSearchQueries] = useState({});

  const {
    data = [],
    count = 0,
    loading,
  } = useSelector((state) => state.apiResponseManagement);
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
    localStorage.setItem(LOCAL_STORAGE_LIMIT_KEY, value);
  };
  const handleRefresh = () => {
    dispatch(apiBatchingAction(page, limit, queryString));
  };
  const handleResetSearch = () => {
    setSearchQueries({});
  };
  return (
    <div
      className="container-fluid d-flex flex-column min-vh-100 py-4"
      style={{ margin: "0 auto" }}
    >
      <h2 className="text-center mb-4">API Responses</h2>
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
        <div className="d-flex align-items-center">
          <ApiResponseSearchPopup setSearchQueries={setSearchQueries} />
          <Button
            variant="primary"
            className="ms-2"
            onClick={handleResetSearch}
            aria-label="Reset search"
          >
            Reset
          </Button>
          <Button
            variant="primary"
            className="ms-3"
            onClick={handleRefresh}
            aria-label="Refresh data"
          >
            <i className="bi bi-arrow-clockwise"></i> Refresh
          </Button>
        </div>
      </div>

      <div className="table-responsive">
        <Table striped bordered hover size="sm">
          <thead className="table-light">
            <tr>
              <th>View</th>
              <th>Job ID</th>
              <th>API Type</th>
              <th>Key Name</th>
              <th>Pricing</th>
            <th>API Status</th>
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
                <BatchTableRow
                  key={item._id}
                  item={item}
                  navigate={navigate}
                  dispatch={dispatch}
                />
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

      {totalPages > 1 && (
  <div className="d-flex justify-content-center mt-4">
    <Pagination>
      <Pagination.Prev
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      />

      {(() => {
        const pages = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
          for (let i = 1; i <= totalPages; i++) {
            pages.push(
              <Pagination.Item
                key={i}
                active={page === i}
                onClick={() => setPage(i)}
              >
                {i}
              </Pagination.Item>
            );
          }
        } else {
          const startPage = Math.max(2, page - 1);
          const endPage = Math.min(totalPages - 1, page + 1);

          pages.push(
            <Pagination.Item
              key={1}
              active={page === 1}
              onClick={() => setPage(1)}
            >
              1
            </Pagination.Item>
          );

          if (startPage > 2) {
            pages.push(<Pagination.Ellipsis key="start-ellipsis" disabled />);
          }

          for (let i = startPage; i <= endPage; i++) {
            pages.push(
              <Pagination.Item
                key={i}
                active={page === i}
                onClick={() => setPage(i)}
              >
                {i}
              </Pagination.Item>
            );
          }

          if (endPage < totalPages - 1) {
            pages.push(<Pagination.Ellipsis key="end-ellipsis" disabled />);
          }
          pages.push(
            <Pagination.Item
              key={totalPages}
              active={page === totalPages}
              onClick={() => setPage(totalPages)}
            >
              {totalPages}
            </Pagination.Item>
          );
        }

        return pages;
      })()}

      {/* Next Button */}
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
