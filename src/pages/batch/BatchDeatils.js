import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Form } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";
import { apiBatchingAction } from "../../store/apiResponseManagement";
import BatchDeatilsSearchPopup from "./BatchDeatilsSearch";

function BatchDetails() {
  const { id } = useParams();
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
    setSearchQueries({ batchId: id });
  }, [id]);

  useEffect(() => {
    if (searchQueries?.batchId) {
      dispatch(apiBatchingAction(page, limit, queryString));
    }
  }, [dispatch, page, limit, queryString]);

  const totalPages = Math.ceil(count / limit);

  const handleLimitChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setLimit(value);
    setPage(1);
  };

  return (
    <div style={{ width: "80vw", minWidth: "600px" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button
          onClick={() => navigate(-1)}
          className="btn btn-secondary rounded-pill px-4 py-2"
          aria-label="Go back"
        >
          Back
        </button>
        <h2>Batch Details</h2>
      </div>

      <div className="d-flex align-items-center mt-3 mb-4">
        <p className="mb-0 me-3">
          Total: <b>{count}</b>
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
            <option disabled>Choose...</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </Form.Select>
        </div>

        <BatchDeatilsSearchPopup setSearchQueries={setSearchQueries} />
      </div>

      <div className="d-flex flex-column min-vh-100">
        <div className="flex-grow-1">
          <div className="table-responsive">
            <table className="table table-striped table-bordered mt-2">
              <thead className="table-light">
                <tr>
                  <th scope="col">View</th>
                  <th scope="col">Job ID</th>
                  <th scope="col">API Type</th>
                  <th scope="col">Key Name</th>
                  <th scope="col">Unique Id</th>
                  <th scope="col">Pricing</th>
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
                      <td className="text-center align-middle">{item.job_id}</td>
                      <td className="text-center align-middle">{item.apiType}</td>
                      <td className="text-center align-middle">{item.backend_api_key_name}</td>
                      <td className="text-center align-middle">{item.unique_id}</td>
                      <td className="text-center align-middle">{item.pricing}</td>
                      <td className="text-center align-middle">{item.apiStatus}</td>
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
        )}
      </div>
    </div>
  );
}

export default BatchDetails;
