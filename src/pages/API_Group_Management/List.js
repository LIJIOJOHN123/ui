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
  }, [page, limit, dispatch, queryString, data]);

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
            <h3>API Group</h3>
            <Button
              onClick={() => navigate("/api-groups/create")}
              variant="primary"
              className="fw-bold"
            >
              Add group
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

            <APiGroupSearch data={data} setSearchQueries={setSearchQueries} />
          </div>
          <div className="d-flex flex-column min-vh-100">
            <div className="flex-grow-2">
              <Row className="mt-4">
                {data &&
                  data.map((item, i) => (
                    <Col key={i} xs={12} sm={6} md={4} lg={3} className="mb-4">
                      <div className="bg-info p-2 rounded-3 h-100">
                        <div
                          onClick={() => navigate(`/api-groups/${item._id}`)}
                        >
                          <h6>{item.name}</h6>
                          <p className="line-clamp">{item.description}</p>
                        </div>
                        <div className="mt-3 " style={{ zIndex: 10 }}>
                          <Button
                            onClick={() => openDeleteModal(item._id, item.name)}
                          >
                            Delete
                          </Button>
                          <Button
                            onClick={() =>
                              navigate(`/api-groups/edit/${item._id}`)
                            }
                          >
                            Edit
                          </Button>
                        </div>
                      </div>
                    </Col>
                  ))}
              </Row>
            </div>
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
          </div>
        </div>
      )}

      <ConfirmationModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        message={`${apiToDelete.name} Api Group`}
      />
    </div>
  );
}

export default APIGroupList;
