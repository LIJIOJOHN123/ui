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
  const [limit, setLimit] = useState(5);
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
    <div>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center mt-5">
          <div className="spinner-grow" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div>
          <div className="d-flex justify-content-between align-items-center">
            <h3>API List</h3>
            <Button
              onClick={() => navigate("/api-list/create")}
              variant="primary"
              className="fw-bold"
            >
              Add API
            </Button>
          </div>

          {/* Total APIs with Limit Dropdown */}
          <div className="d-flex align-items-center mt-3">
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
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </Form.Select>
            </div>

            <SearchPopup data={data} setSearchQueries={setSearchQueries} />
          </div>

          {/* Pagination and API List */}
          <div className="d-flex flex-column min-vh-100">
            <div className="flex-grow-2">
              <Row className="mt-4">
                {!data.length ? (
                  <div>No data</div>
                ) : (
                  data.map((item, i) => (
                    <Col key={i} xs={12} sm={6} md={4} lg={3} className="mb-4">
                      <div className="bg-info p-2 rounded-3 h-100">
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() => navigate(`/api-list/${item._id}`)}
                        >
                          <p>
                            {" "}
                            Api Name:<b>{item.apiname}</b>
                          </p>

                          <p>
                            {" "}
                            Description:<b>{item.des}</b>
                          </p>
                          <p>
                            {" "}
                            Api Type:<b>{item.api_type}</b>
                          </p>
                          <p>
                            {" "}
                            Backend Api key:<b>{item.backend_api_key_name}</b>
                          </p>
                          <p>
                            <b>₹{item.pricing}</b> per request
                          </p>
                        </div>
                        <div className="mt-3  d-flex justify-content-between">
                          <Button
                            onClick={() =>
                              openDeleteModal(item._id, item.apiname)
                            }
                            className="ml-5 btn-danger"
                          >
                            Delete
                          </Button>
                          <Button
                            onClick={() =>
                              navigate(`/api-list/edit/${item._id}`)
                            }
                          >
                            Edit
                          </Button>
                        </div>
                      </div>
                    </Col>
                  ))
                )}
              </Row>
            </div>

            {/* Pagination */}
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
          </div>
        </div>
      )}

      <ConfirmationModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        message={`${apiToDelete.name} Api`}
      />
    </div>
  );
}

export default ApiList;
