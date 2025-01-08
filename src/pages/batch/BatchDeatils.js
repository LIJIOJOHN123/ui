import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Table, Pagination, Button, Spinner } from "react-bootstrap";
import {
  apiBatchingAction,
  retriggerBatchingAction,
} from "../../store/apiResponseManagement";
import BatchDetailsSearchPopup from "./BatchDeatilsSearch";

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

const BatchTableRow = ({ item, navigate, dispatch, queryString }) => (
  <tr>
    <td className="text-center align-middle">
      <i
        className="bi bi-eye-fill text-primary"
        style={{ cursor: "pointer" }}
        aria-label={`View details for ${item._id}`}
        onClick={() => navigate(`/products/batch-details-view/${item._id}`)}
      ></i>
    </td>
    <td className="text-center align-middle">{item.job_id}</td>
    <td className="text-center align-middle">{item.apiType}</td>
    <td className="text-center align-middle">{item.backend_api_key_name}</td>
    <td className="text-center align-middle">{item.pricing}</td>
    <td className="text-center align-middle">{item.preValidationStatus}</td>
    <td className="text-center align-middle">{item.apiStatus}</td>
    <td className="text-center align-middle">{item.postValidationStatus}</td>
    <td className="text-center align-middle">
      {item.apiStatus === "FAILED" ? (
        <Button
          size="sm"
          variant="danger"
          onClick={() => {
            dispatch(retriggerBatchingAction(item._id));
            dispatch(apiBatchingAction("", "", queryString));
          }}
        >
          Retrigger
        </Button>
      ) : (
        <span className="text-success">✔</span>
      )}
    </td>
  </tr>
);

function BatchDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [searchQueries, setSearchQueries] = useState({});

  const {
    data = [],
    count,
    loading,
  } = useSelector((state) => state.apiResponseManagement);

  const queryString = Object.entries(searchQueries)
    .filter(([_, value]) => value !== "")
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  useEffect(() => {
    setSearchQueries({ job_id: id });
  }, [id]);

  useEffect(() => {
    if (searchQueries?.job_id) {
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
        <h2 className="mb-0">Batch Details</h2>
      </div>

      {/* Filters Section */}
      <div className="d-flex align-items-center mb-3">
        <p className="mb-0 me-3">
          Total Records: <b>{count}</b>
        </p>
        <LimitSelector limit={limit} handleLimitChange={handleLimitChange} />
        <BatchDetailsSearchPopup setSearchQueries={setSearchQueries} />
      </div>

      {/* Table Section */}
      <div className="table-responsive">
        <Table striped bordered hover size="sm">
          <thead className="table-light">
            <tr>
              <th>View</th>
              <th>Job ID</th>
              <th>API Type</th>
              <th>Key Name</th>
              <th>Pricing</th>
              <th>Prevalidation Status</th>
              <th>Api Status</th>
              <th>Postvalidation Status</th>
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
                  queryString={queryString}
                />
              ))
            ) : (
              <tr>
                <td colSpan="10" className="text-center text-muted">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {/* Pagination Section */}
       {totalPages > 1 && (
                     <div className="d-flex justify-content-center mt-4">
                       <Pagination>
                         <Pagination.Prev
                           disabled={page === 1}
                           onClick={() => setPage(page - 1)}
                         />
             
                         {/* Show pages dynamically based on the total page count */}
                         {totalPages <= 5 ? (
                           // If there are 5 or fewer pages, display all pages
                           [...Array(totalPages).keys()].map((num) => (
                             <Pagination.Item
                               key={num}
                               active={page === num + 1}
                               onClick={() => setPage(num + 1)}
                             >
                               {num + 1}
                             </Pagination.Item>
                           ))
                         ) : (
                           <>
                             {/* Show first page */}
                             <Pagination.Item
                               key={1}
                               active={page === 1}
                               onClick={() => setPage(1)}
                             >
                               1
                             </Pagination.Item>
             
                             {/* Show ellipsis if there is a gap between the first and the middle pages */}
                             {page > 3 && <Pagination.Ellipsis disabled />}
             
                             {/* Show middle pages, but limit the visible pages (3 pages before or after the current page) */}
                             {[...Array(3).keys()].map((i) => {
                               const pageNum = page + i - 1;
                               if (pageNum > 1 && pageNum < totalPages - 1) {
                                 return (
                                   <Pagination.Item
                                     key={pageNum}
                                     active={page === pageNum}
                                     onClick={() => setPage(pageNum)}
                                   >
                                     {pageNum}
                                   </Pagination.Item>
                                 );
                               }
                               return null;
                             })}
             
                             {/* Show ellipsis if there is a gap between the middle pages and the last page */}
                             {page < totalPages - 3 && <Pagination.Ellipsis disabled />}
             
                             {/* Show last page */}
                             <Pagination.Item
                               key={totalPages}
                               active={page === totalPages}
                               onClick={() => setPage(totalPages)}
                             >
                               {totalPages}
                             </Pagination.Item>
                           </>
                         )}
             
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

export default BatchDetails;
