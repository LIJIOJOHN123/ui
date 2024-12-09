import React, { useEffect, useState } from "react";
import { Button, Col, Form, Pagination, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteproductAction,
  productAction,
} from "../../store/productManagementSlice";
import ProductSearchPopup from "./SearchInput";
import ConfirmationModal from "../../utils/ConfirmationModal ";

function ApiGroup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, loading, count } = useSelector(
    (state) => state.productManagement
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
    dispatch(productAction(page, limit, queryString));
  }, [page, limit, dispatch, queryString]);

  const totalPages = Math.ceil(count / limit);

  const handleLimitChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setLimit(value);
    setPage(1);
  };
  const handleDelete = () => {
    if (apiToDelete.id) {
      dispatch(deleteproductAction(apiToDelete.id));
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
            <h3>Products</h3>
            <Button
              onClick={() => navigate("/products/create")}
              variant="primary"
              className="fw-bold"
            >
              Add a product
            </Button>
          </div>
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

            <ProductSearchPopup setSearchQueries={setSearchQueries} />
          </div>

          <div className="d-flex flex-column min-vh-100">
            <div className="flex-grow-2">
              <Row className="mt-4">
                {data &&
                  data.map((item, i) => (
                    <Col key={i} xs={12} sm={6} md={4} lg={3} className="mb-4">
                      <div className="bg-info p-2 rounded-3 h-100">
                        <div onClick={() => navigate(`/products/${item._id}`)}>
                          <h6>{item.name}</h6>
                          <p className="line-clamp">{item.des}</p>
                        </div>
                        <div className="mt-3 " style={{ zIndex: 10 }}>
                          <Button
                            onClick={() => openDeleteModal(item._id, item.name)}
                          >
                            Delete
                          </Button>
                          <Button
                            onClick={() =>
                              navigate(`/products/edit/${item._id}`)
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
        message={`${apiToDelete.name} Product`}
      />
    </div>
  );
}

export default ApiGroup;
