import React, { useEffect, useState } from "react";
import { Button, Col, Form, Pagination, Row } from "react-bootstrap";
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
    <div className="p-4 bg-light">
      {loading ? (
        <div className="d-flex justify-content-center align-items-center mt-5">
          <div className="spinner-grow text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3>API Group</h3>
            <Button
              onClick={() => navigate("/api-groups/create")}
              variant="primary"
              className="fw-bold"
            >
              Add Group
            </Button>
          </div>

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
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </Form.Select>
            </div>
            <APiGroupSearch data={data} setSearchQueries={setSearchQueries} />
          </div>

          <Row className="mt-4">
            {data.length === 0 ? (
              <Col xs={12}>
                <div className="text-center text-muted">No data available</div>
              </Col>
            ) : (
              data.map((item, i) => (
                <Col key={i} xs={12} sm={6} md={4} lg={3} className="mb-4">
                  <div className="bg-white p-3 rounded shadow-sm h-100">
                    <div onClick={() => navigate(`/api-groups/${item._id}`)}>
                      <h6 className="text-dark">{item.name}</h6>
                      <p className="text-muted line-clamp">{item.description}</p>
                      <p className="text-muted line-clamp">{`${item.apiId.length} APIs used `}</p>
                    </div>
                    <div className="mt-3 d-flex justify-content-between">
                      <Button
                        variant="danger"
                        onClick={() => openDeleteModal(item._id, item.name)}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => navigate(`/api-groups/edit/${item._id}`)}
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                </Col>
              ))
            )}
          </Row>

          {count > limit && (
            <div className="mt-4 d-flex justify-content-center">
              <Pagination>
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

                {page > 4 && page < totalPages - 2 && (
                  <Pagination.Ellipsis disabled />
                )}

                {page > 3 && page < totalPages - 2 && (
                  <Pagination.Item active onClick={() => setPage(page)}>
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

          <ConfirmationModal
            show={showDeleteModal}
            onHide={() => setShowDeleteModal(false)}
            onConfirm={handleDelete}
            message={`${apiToDelete.name} API Group`}
          />
        </div>
      )}
    </div>
  );
}

export default APIGroupList;
