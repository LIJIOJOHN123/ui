import React, { Fragment, useEffect, useState } from "react";
import { Form, Pagination, Card, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clientManagementListAction,
  updateClientAction,
} from "../../store/clientManagementSlice";
import ClientSearchPopup from "./ClientSearchPopup";
import FundForm from "./FundForm";

const ClientManagement = () => {
  const dispatch = useDispatch();
  const { data, count } = useSelector((state) => state.clientManagement);

  const [searchQueries, setSearchQueries] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);

  const queryString = Object.entries(searchQueries)
    .filter(([_, value]) => value !== "")
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  useEffect(() => {
    dispatch(clientManagementListAction(page, limit, queryString));
  }, [page, limit, dispatch, queryString]);

  const navigate = useNavigate();
  const handleButton = (id, data) => {
    dispatch(updateClientAction(id, data));
  };

  const handleLimitChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setLimit(value);
    setPage(1);
  };

  const totalPages = Math.ceil(count / limit);

  return (
    <Fragment>
      {/* Header Section */}
      <div className="d-flex justify-content-center mb-4">
        <h3>Client List</h3>
      </div>

      {/* Filters and Actions */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <p className="mb-0">Total: <b>{count}</b></p>
        <div className="d-flex align-items-center">
          <ClientSearchPopup />
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
      </div>

      {/* Client Cards */}
      <Row className="g-4">
        {data?.length > 0 ? (
          data.map((item) => (
            <Col md={4} key={item._id}>
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>
                    <strong>Email:</strong> {item.email}
                  </Card.Text>
                  <Card.Text>
                    <strong>Client ID:</strong> {item?.clientId?._id || "N/A"}
                  </Card.Text>
                  <Card.Text>
                    <strong>Account Balance:</strong> {item?.clientId?.account_balance || "N/A"}
                  </Card.Text>
                  <Card.Text>
                    <strong>Backend API Key:</strong> {item?.clientId?.backend_apikey || "N/A"}
                  </Card.Text>
                  <Card.Text>
                    <span
                      className={`badge ${
                        item.role === "ADMIN" ? "bg-success" : "bg-secondary"
                      }`}
                    >
                      {item.role}
                    </span>
                  </Card.Text>
                  <div className="d-flex gap-2">
                    {item.status === "ACTIVE" ? (
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() =>
                          handleButton(item._id, { status: "INACTIVE" })
                        }
                      >
                        Block
                      </Button>
                    ) : (
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() =>
                          handleButton(item._id, { status: "ACTIVE" })
                        }
                      >
                        Unblock
                      </Button>
                    )}
                    {item.role === "ADMIN" ? (
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() =>
                          handleButton(item._id, { role: "USER" })
                        }
                      >
                        Remove Admin
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() =>
                          handleButton(item._id, { role: "ADMIN" })
                        }
                      >
                        Make Admin
                      </Button>
                    )}
                    <FundForm id={item._id} />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <div className="text-center text-muted" style={{ width: "100%" }}>
            No clients found.
          </div>
        )}
      </Row>

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-4">
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
      </div>
    </Fragment>
  );
};

export default ClientManagement;
