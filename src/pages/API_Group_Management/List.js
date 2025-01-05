import React, { useEffect, useState } from "react";
import { Button, Form, Pagination, Spinner, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteApiGroupAction,
  ApiGroupAction,
} from "../../store/apiGroupManagementSlice";
import APiGroupSearch from "./APiGroupSearch";
import ConfirmationModal from "../../utils/ConfirmationModal ";

function APIGroupList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, loading, count } = useSelector(
    (state) => state.apiGroupManagement
  );

  const [searchQueries, setSearchQueries] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [apiToDelete, setApiToDelete] = useState({ id: null, name: "" });

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

  const handleDelete = () => {
    if (apiToDelete.id) {
      dispatch(deleteApiGroupAction(apiToDelete.id));
    }
    setShowDeleteModal(false);
    setApiToDelete({ id: null, name: "" });
  };

  const openDeleteModal = (id, name) => {
    setApiToDelete({ id, name });
    setShowDeleteModal(true);
  };

  return (
    <div className="bg-body-secondary w-100 min-vh-100 p-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>API Groups</h3>
        <Button
          onClick={() => navigate("/api-groups/create")}
          variant="primary"
          className="fw-bold"
        >
          Add Group
        </Button>
      </div>
      {/* Search and Filters */}
      <div className="d-flex align-items-center mb-4">
        <p className="mb-0 me-3">
          Total: <strong>{count}</strong>
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
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
          </Form.Select>
        </div>
        <APiGroupSearch setSearchQueries={setSearchQueries} />
      </div>
      {/* Table */}
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>APIs Used</th>
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
              <tr
                key={item._id}
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/api-groups/${item._id}`)}
              >
                <td>{index + 1 + (page - 1) * limit}</td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.apiId.length}</td>
                <td
                  onClick={(e) => e.stopPropagation()} // Prevent row click event from triggering
                >
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => navigate(`/api-groups/edit/${item._id}`)}
                    className="me-2"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => openDeleteModal(item._id, item.name)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center text-muted">
                No API Groups found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      {/* Pagination */}
      {count > limit && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination>
            <Pagination.Prev
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            />
            {[...Array(totalPages).keys()].map((num) => (
              <Pagination.Item
                key={num + 1}
                active={page === num + 1}
                onClick={() => setPage(num + 1)}
              >
                {num + 1}
              </Pagination.Item>
            ))}
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
        message={`Are you sure you want to delete the group "${apiToDelete.name}"?`}
      />
    </div>
  );
}

export default APIGroupList;
