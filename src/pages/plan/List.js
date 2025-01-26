import React, { useEffect, useState } from "react";
import { Button, Col, Form, Pagination, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteplanAction, planAction } from "../../store/planSlice";
import ConfirmationModal from "../../utils/ConfirmationModal ";
import PlanSearchPopup from "./SearchInput";

function PlanList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, loading, count } = useSelector((state) => state.plan);

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
    dispatch(planAction(page, limit, queryString));
  }, [page, limit, dispatch, queryString]);

  const totalPages = Math.ceil(count / limit) ?? 1;

  const handleLimitChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setLimit(value);
    setPage(1);
  };

  const handleDelete = () => {
    if (apiToDelete.id) {
      dispatch(deleteplanAction(apiToDelete.id));
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
            <h3>Plans</h3>
            <Button
              onClick={() => navigate("/plan/create")}
              variant="primary"
              className="fw-bold"
            >
              Add Plans
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

            <PlanSearchPopup setSearchQueries={setSearchQueries} />
          </div>

          <div className="d-flex flex-column min-vh-100">
            <div className="flex-grow-2">
              <Row className="mt-4">
                {data.length === 0 ? (
                  <div>No data available</div>
                ) : (
                  data.map((item, i) => (
                    <Col key={i} xs={12} sm={6} md={4} lg={3} className="mb-4">
                      <div className="bg-info p-2 rounded-3 h-100">
                        {/* <div
                          style={{ cursor: "pointer" }}
                          onClick={() => navigate(`/api-list/${item._id}`)}
                        > */}
                          <h6><b>{item.name}</b></h6>
                          <p>currency : {item.currency}</p>
                          <p>Plantype : {item.plantype}</p>
                          <p>Credit : {item.credit}</p>
                          <p>Amount: {item.pricing}</p>
                          <p>Plan status: {item.planstatus}</p>
                          <div>
                            {item.apiId &&
                              item.apiId.map((field, index) => (
                                <p key={index}>
                                  {field.apiId}: {field.discoutedPrice}
                                </p>
                              ))}
                          </div>
                        {/* </div> */}

                        <div className="mt-3">
                          <Button
                            variant="danger"
                            onClick={() => openDeleteModal(item._id, item.name)}
                            className="me-2"
                          >
                            Delete
                          </Button>
                          <Button
                            variant="secondary"
                            onClick={() => navigate(`/plan/edit/${item._id}`)}
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

            <div className="mt-auto">
              {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-4">
                  <Pagination>
                    <Pagination.Prev
                      disabled={page === 1}
                      onClick={() => setPage(page - 1)}
                    />
                    {totalPages <= 5 ? (
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
                        <Pagination.Item
                          key={1}
                          active={page === 1}
                          onClick={() => setPage(1)}
                        >
                          1
                        </Pagination.Item>
                        {page > 3 && <Pagination.Ellipsis disabled />}
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
                        {page < totalPages - 3 && <Pagination.Ellipsis disabled />}
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
          </div>
        </div>
      )}
      <ConfirmationModal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        message={`${apiToDelete.name} Plan`}
      />
    </div>
  );
}

export default PlanList;
