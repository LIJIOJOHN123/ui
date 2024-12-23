import React, { Fragment, useEffect, useState } from "react";
import { Form, Pagination, Table, Button, Spinner } from "react-bootstrap";
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
  const { data = [], count = 0, loading } = useSelector(
    (state) => state.clientManagement
  );

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
        <h3>Client Management</h3>
      </div>

      {/* Filters and Actions */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <p className="mb-0">
          Total: <b>{count}</b>
        </p>
        <div className="d-flex align-items-center">
          <ClientSearchPopup setSearchQueries={setSearchQueries} />
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

      {/* Client Table */}
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Client ID</th>
              <th>Account Balance</th>
              <th>Role</th>
              <th>Status</th>
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
              data.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item?.clientId?._id || "N/A"}</td>
                  <td>{item?.clientId?.account_balance || "N/A"}</td>
                  <td>
                    <span
                      className={`badge ${
                        item.role === "ADMIN" ? "bg-success" : "bg-secondary"
                      }`}
                    >
                      {item.role}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        item.status === "ACTIVE" ? "bg-primary" : "bg-danger"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td>
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
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center text-muted">
                  No clients found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-4">
        <Pagination>
          <Pagination.Prev
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          />
          {[...Array(totalPages).keys()].map((num) =>
            num + 1 <= totalPages ? (
              <Pagination.Item
                key={num}
                active={page === num + 1}
                onClick={() => setPage(num + 1)}
              >
                {num + 1}
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
