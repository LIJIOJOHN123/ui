import React, { useEffect, useState } from "react";
import { Button, Form, Pagination, Spinner, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getByIdClientDataAPIAction } from "../../store/apiResponseManagement";

// Modular Components
const LimitSelector = ({ limit, handleLimitChange }) => (
  <div className="d-flex align-items-center me-3">
    <label htmlFor="limit" className="me-2">
      Records per Page:
    </label>
    <Form.Select
      id="limit"
      className="form-select w-auto"
      value={limit}
      onChange={handleLimitChange}
      aria-label="Select records per page"
    >
      <option value={25}>25</option>
      <option value={50}>50</option>
      <option value={100}>100</option>
    </Form.Select>
  </div>
);

const BatchTableRow = ({ item, navigate, id }) => (
  <tr>
    <td className="text-center align-middle">
      <i
        className="bi bi-eye-fill text-primary"
        style={{ cursor: "pointer" }}
        aria-label={`View details for ${id}`}
        onClick={() => navigate(`/products/batch-deatils/${id}`)}
      ></i>
    </td>
    <td className="text-center align-middle">{item.job_id}</td>

    <td className="">
      {Object.entries(item.apirequestbody).map(([key, value]) => (
        <div key={key}>
          <strong>{key}:</strong> {value}
        </div>
      ))}
    </td>

    <td className="text-center align-middle">{item.dataStatus}</td>
    <td className="text-center align-middle">
      {<span className="text-success">✔</span>}
    </td>
    {/* <td className="text-center align-middle">
      {item.dataStatus === "API FAILED" ? (
        <Button size="sm" variant="danger">
          Retrigger
        </Button>
      ) : (
        <span className="text-success">✔</span>
      )}
    </td> */}
  </tr>
);

function ClientDataDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [searchQueries, setSearchQueries] = useState({});

  const {
    dataById: data,
    count = 0,
    loading,
  } = useSelector((state) => state.apiResponseManagement);

  const queryString = Object.entries(searchQueries)
    .filter(([_, value]) => value !== "")
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  useEffect(() => {
    setSearchQueries({ batchId: id });
  }, [id]);

  useEffect(() => {
    if (searchQueries?.batchId) {
      dispatch(getByIdClientDataAPIAction(page, limit, queryString));
    }
  }, [dispatch, page, limit, queryString]);

  const totalPages = Math.ceil(count / limit);

  const handleLimitChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setLimit(value);
    setPage(1);
  };

  return (
    <div className="container my-4" style={{ maxWidth: "95vw" }}>
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Button
          onClick={() => navigate(-1)}
          variant="secondary"
          className="rounded-pill px-4"
          aria-label="Go back"
        >
          Back
        </Button>
        <h2 className="mb-0">Input Details</h2>
      </div>

      {/* Filters Section */}
      <div className="d-flex align-items-center mb-3">
        <p className="mb-0 me-3">
          Total Records: <b>{count}</b>
        </p>
        <LimitSelector limit={limit} handleLimitChange={handleLimitChange} />
        {/* <BatchDetailsSearchPopup setSearchQueries={setSearchQueries} /> */}
      </div>

      {/* Table Section */}
      <div className="table-responsive">
        <Table striped bordered hover size="sm">
          <thead className="table-light">
            <tr>
              <th>View</th>
              <th>Job ID</th>
              <th>Client Input</th>

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
                <BatchTableRow
                  key={item._id}
                  item={item}
                  navigate={navigate}
                  id={id}
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

      {/* Pagination Section */}
      {totalPages > 1 && (
        <Pagination className="d-flex justify-content-center">
          <Pagination.Prev
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          />
          {Array.from({ length: totalPages }).map((_, idx) => (
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
      )}
    </div>
  );
}

export default ClientDataDetails;
