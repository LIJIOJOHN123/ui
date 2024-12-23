import React, { useEffect, useState } from "react";
import { Alert, Button, Col, Form, Pagination, Row, Card, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { deletePostValidation, fetchPostValidations } from "../../store/postvalidationSlice";
import PostValidationSearchPopup from "./SearchInput";
import ConfirmationModal from "../../utils/ConfirmationModal ";

function PostValidationList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, loading, count, error } = useSelector((state) => state.postvalidation);

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
    dispatch(fetchPostValidations(page, limit, queryString));
  }, [page, limit, dispatch, queryString]);

  const totalPages = Math.ceil(count / limit);

  const handleLimitChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setLimit(value);
    setPage(1);
  };

  const handleDelete = () => {
    if (apiToDelete.id) {
      dispatch(deletePostValidation(apiToDelete.id));
    }
    setShowDeleteModal(false);
    setApiToDelete({ id: null, name: "" });
  };

  const openDeleteModal = (id, name) => {
    setApiToDelete({ id, name });
    setShowDeleteModal(true);
  };

  return (
    <div className="container-fluid">
      {loading ? (
        <div className="d-flex justify-content-center align-items-center mt-5">
          <Spinner animation="border" role="status" variant="primary">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : error ? (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      ) : (
        <div>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="font-weight-bold text-primary">Post-Validation</h3>
            <Button
              onClick={() => navigate("/post-validation/create")}
              variant="success"
              className="fw-bold d-flex align-items-center"
            >
              <i className="bi bi-plus-circle me-2"></i>
              Add Post Validation
            </Button>
          </div>

          <div className="d-flex align-items-center mt-3 mb-4">
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
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </Form.Select>
            </div>

            <PostValidationSearchPopup setSearchQueries={setSearchQueries} />
          </div>

          <Row className="mt-4">
            {data && data.length > 0 ? (
              data.map((item, i) => (
                <Col key={i} xs={12} sm={6} md={4} lg={3} className="mb-4">
                  <Card className="shadow-sm border-light rounded-lg">
                    <Card.Body>
                      <Card.Title className="h5 text-primary">{item.name}</Card.Title>
                      <Card.Text className="text-muted">{item.des || "No Description"}</Card.Text>
                      <Card.Text className="text-muted">
                        <small>Validation Key: {item.validation_key || "No Key"}</small>
                      </Card.Text>
                      <div className="d-flex justify-content-between mt-3">
                        <Button
                          variant="danger"
                          size="sm"
                          className="d-flex align-items-center"
                          onClick={() => openDeleteModal(item._id, item.name)}
                        >
                          <FaTrashAlt className="me-1" /> Delete
                        </Button>
                        <Button
                          variant="warning"
                          size="sm"
                          className="d-flex align-items-center"
                          onClick={() => navigate(`/post-validation/edit/${item._id}`)}
                        >
                          <FaEdit className="me-1" /> Edit
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <div className="text-center w-100 mt-4">
                <h5>No Post validations found.</h5>
              </div>
            )}
          </Row>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination className="d-flex justify-content-center mt-4">
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
                <Pagination.Item key={page} active onClick={() => setPage(page)}>
                  {page}
                </Pagination.Item>
              )}

              {page < totalPages - 3 && totalPages > 5 && <Pagination.Ellipsis disabled />}

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
          )}
        </div>
      )}

      {/* Confirmation Modal for Delete */}
      <ConfirmationModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        message={`Are you sure you want to delete "${apiToDelete.name}" Post Validation?`}
      />
    </div>
  );
}

export default PostValidationList;
