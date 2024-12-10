import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { apiBatchingAction } from "../../store/apiResponseManagement";
import ApiResponseSearchPopup from "./SearchInput";


function ApiResponse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [searchQueries, setSearchQueries] = useState({});

  const { data, count } = useSelector((state) => state.apiResponseManagement);

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

  console.log(data, "data");

  return (
    <div style={{ width: "80vw", minWidth: "600px" }}>
      <h2>Api Responses</h2>

      <div className="d-flex align-items-center mt-3">
        <p className="mb-0 me-3">
          Total: <b>{count}</b>
        </p>
        <div className="d-flex align-items-center me-3">
          <label htmlFor="limit" className="me-2">
            Record(s) per Page:
          </label>
          <Form.Select
            id="limit"
            className="form-select w-auto"
            value={limit}
            onChange={handleLimitChange}
          >
            <option disabled>Choose...</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </Form.Select>
        </div>

        <ApiResponseSearchPopup setSearchQueries={setSearchQueries} />
      </div>

      <div className="d-flex flex-column min-vh-100">
        <div className="flex-grow-1">
          <div className="table-responsive">
            <table className="table table-striped table-bordered mt-2">
              <thead>
                <tr>
                  <th scope="col">View</th>
                  <th scope="col">Job ID</th>
                  <th scope="col">API Type</th>
                  <th scope="col">Key Name</th>
                  <th scope="col">Unique Id</th>
                  <th scope="col">Batch Id</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((item, i) => (
                    <tr key={item._id || i}>
                      <td className="text-center align-middle">
                        <i
                          className="bi bi-eye-fill"
                          style={{ cursor: "pointer" }}
                          aria-label={`View details for ${item._id}`}
                          onClick={() =>
                            navigate(`/products/batch-details-view/${item._id}`)
                          }
                        ></i>
                      </td>
                      <td className="text-center align-middle">
                        {item.job_id}
                      </td>
                      <td className="text-center align-middle">
                        {item.apiType}
                      </td>
                      <td className="text-center align-middle">
                        {item.backend_api_key_name}
                      </td>
                      <td className="text-center align-middle">
                        {item.unique_id}
                      </td>
                      <td className="text-center align-middle">
                        {item.batchId}
                      </td>
                      <td className="text-center align-middle">
                        {item.apiStatus}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center text-muted">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {totalPages > 1 && (
          <div className="mt-auto">
                <Pagination className="d-flex justify-content-center">
          <Pagination.Prev
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          />

          {/* First three pages */}
          {[1, 2, 3].map((num) =>
            num <= totalPages ? (
              <Pagination.Item
                key={num}
                active={page === num}
                onClick={() => setPage(num)}
              >
                {num}
              </Pagination.Item>
            ) : null
          )}

          {/* Ellipsis if necessary */}
          {page > 4 && page < totalPages - 2 && <Pagination.Ellipsis disabled />}

          {/* Current page, if not in the first three */}
          {page > 3 && page < totalPages - 2 && (
              <Pagination.Item
                key={page}
                active
                onClick={() => setPage(page)}
              >
                {page}
              </Pagination.Item>
            )}

            {/* Ellipsis before the last two pages */}
            {page < totalPages - 3 && totalPages > 5 && <Pagination.Ellipsis disabled />}

            {/* Last two pages */}
            {[totalPages - 1, totalPages].map((num) =>
              num > 3 ? (
                <Pagination.Item
                  key={num}
                  active={page === num}
                  onClick={() => setPage(num)}
                >
                  {num}
                </Pagination.Item>
              ) : null
            )}

            <Pagination.Next
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            />
          </Pagination>
          </div>
        )}
      </div>
    </div>
  );
}

export default ApiResponse;
