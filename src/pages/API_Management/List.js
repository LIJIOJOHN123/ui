import React, { useEffect, useState } from "react";
import { Button, Col, Row, Pagination, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { apiListAction, deleteApiAction } from "../../store/apiManagementSlice";
import SearchPopup from "./SearchInput";
import ConfirmationModal from "../../utils/ConfirmationModal ";

function ApiList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, loading, count } = useSelector((state) => state.apiManagement);
  const [searchQueries, setSearchQueries] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [apiToDelete, setApiToDelete] = useState({ id: null, name: "" });

  const queryString = Object.entries(searchQueries)
    .filter(([_, value]) => value !== "")
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  useEffect(() => {
    dispatch(apiListAction(page, limit, queryString));
  }, [page, limit, dispatch, queryString]);

  const totalPages = Math.ceil(count / limit);

  const handleLimitChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setLimit(value);
    setPage(1);
  };

  const handleDelete = () => {
    if (apiToDelete.id) {
      dispatch(deleteApiAction(apiToDelete.id));
    }
    setShowDeleteModal(false);
    setApiToDelete({ id: null, name: "" });
  };

  const openDeleteModal = (id, name) => {
    setApiToDelete({ id, name });
    setShowDeleteModal(true);
  };

  return (
    <div style={{ backgroundColor: "#f0f0f0", display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Loading Spinner */}
      {loading ? (
        <div className="d-flex justify-content-center align-items-center flex-grow-1">
          <div className="spinner-grow text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="flex-grow-1">
          {/* Header Section */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3>API List</h3>
            <Button
              onClick={() => navigate("/api-list/create")}
              variant="primary"
              className="fw-bold"
            >
              Add API
            </Button>
          </div>

          {/* Total Count and Limit Selection */}
          <div className="d-flex flex-wrap align-items-center mb-3">
            <p className="mb-0 me-3">
              Total: <b>{count}</b>
            </p>
            <div className="d-flex align-items-center me-3">
              <label htmlFor="limit" className="me-2 mb-0">
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
            <SearchPopup data={data} setSearchQueries={setSearchQueries} />
          </div>

          {/* API List */}
          <Row className="g-4 flex-grow-1">
            {data.length === 0 ? (
              <Col xs={12}>
                <div className="text-center text-muted">No data available</div>
              </Col>
            ) : (
              data.map((item, i) => (
                <Col key={i} xs={12} sm={6} md={4} lg={3}>
                  <div className="card bg-lightgray shadow-sm h-100">
                    <div
                      className="card-body"
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate(`/api-list/${item._id}`)}
                    >
                      <h5 className="card-title text-center">{item.apiname}</h5>
                      <p className="card-text">{item.des}</p>
                      <p className="card-text">
                        <strong>API Type:</strong> {item.api_type}
                      </p>
                      <p className="card-text">
                        <strong>Backend API Key:</strong> {item.backend_api_key_name}
                      </p>
                      <p className="card-text">
                        <strong>₹{item.pricing}</strong> per request
                      </p>
                    </div>
                    <div className="card-footer d-flex justify-content-between">
                      <Button
                        variant="danger"
                        onClick={() => openDeleteModal(item._id, item.apiname)}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => navigate(`/api-list/edit/${item._id}`)}
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                </Col>
              ))
            )}
          </Row>

          {/* Pagination */}
          {count > limit && (
            <div className="mt-4">
              <Pagination className="d-flex justify-content-center">
                <Pagination.Prev
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                />
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
                {page > 4 && page < totalPages - 2 && <Pagination.Ellipsis disabled />}
                {page > 3 && page < totalPages - 2 && (
                  <Pagination.Item
                    key={page}
                    active
                    onClick={() => setPage(page)}
                  >
                    {page}
                  </Pagination.Item>
                )}
                {page < totalPages - 3 && totalPages > 5 && (
                  <Pagination.Ellipsis disabled />
                )}
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

          {/* Confirmation Modal */}
          <ConfirmationModal
            show={showDeleteModal}
            onHide={() => setShowDeleteModal(false)}
            onConfirm={handleDelete}
            message={`${apiToDelete.name} API`}
          />
        </div>
      )}
    </div>
  );
}

export default ApiList;
