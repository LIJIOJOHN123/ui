import React, { useEffect, useState } from "react";
import { Button, Pagination, Form, Table, Spinner } from "react-bootstrap";
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
    <div
      style={{
        backgroundColor: "#f0f0f0",
        padding: "20px",
        minHeight: "100vh",
      }}
    >
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

      {/* Filters and Total Count */}
      <div className="d-flex align-items-center mb-3">
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

      {/* API Table */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>API Name</th>
            <th>Description</th>
            <th>API Type</th>
            <th>Backend API Key</th>
            <th>Pricing (₹)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="8" className="text-center">
                <Spinner animation="border" variant="primary" />
              </td>
            </tr>
          ) : data.length > 0 ? (
            data.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1 + (page - 1) * limit}</td>
                <td>{item.apiname}</td>
                <td>{item.des}</td>
                <td>{item.api_type}</td>
                <td>{item.backend_api_key_name}</td>
                <td>{item.pricing}</td>
                <td>
                  <div className="d-flex gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => navigate(`/api-list/edit/${item._id}`)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => openDeleteModal(item._id, item.apiname)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center text-muted">
                No APIs found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Pagination */}
      {count > limit && (
        <div className="d-flex justify-content-center mt-4">
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
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        message={`Are you sure you want to delete ${apiToDelete.name} API?`}
      />
    </div>
  );
}

export default ApiList;
