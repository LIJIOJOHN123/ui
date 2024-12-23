import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Pagination,
  Row,
  Card,
  Modal,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteproductAction,
  productAction,
} from "../../store/productManagementSlice";
import ProductSearchPopup from "./SearchInput";
import ConfirmationModal from "../../utils/ConfirmationModal ";

function Product() {
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
  console.log(searchQueries, "searchQueries");
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
    <div className="container-fluid py-4">
      {loading ? (
        <div className="d-flex justify-content-center align-items-center mt-5">
          <div className="spinner-grow" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="fw-bold">Products</h3>
            <Button
              onClick={() => navigate("/products/create")}
              variant="primary"
              className="fw-bold"
            >
              Add a product
            </Button>
          </div>
          <div className="d-flex align-items-center mb-4">
            <p className="mb-0 me-3">
              Total: <b>{count}</b>
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
            <ProductSearchPopup setSearchQueries={setSearchQueries} />
          </div>

          <div className="d-flex flex-column min-vh-100">
            <Row className="mt-4">
              {data &&
                data.map((item, i) => (
                  <Col key={i} xs={12} sm={6} md={4} lg={3} className="mb-4">
                    <Card className="h-100">
                      <Card.Body>
                        <Card.Title
                          className="text-truncate"
                          onClick={() => navigate(`/products/${item._id}`)}
                          style={{ cursor: "pointer" }}
                        >
                          {item.name}
                        </Card.Title>
                        <Card.Text className="line-clamp">{item.des}</Card.Text>
                        <div className="d-flex justify-content-between">
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => openDeleteModal(item._id, item.name)}
                          >
                            Delete
                          </Button>
                          <Button
                            variant="warning"
                            size="sm"
                            onClick={() =>
                              navigate(`/products/edit/${item._id}`)
                            }
                          >
                            Edit
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
            </Row>

            <div className="mt-auto">
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
                {page > 4 && page < totalPages - 2 && (
                  <Pagination.Ellipsis disabled />
                )}
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
          </div>
        </div>
      )}
      <ConfirmationModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        message={`Are you sure you want to delete ${apiToDelete.name} Product?`}
      />
    </div>
  );
}

export default Product;
