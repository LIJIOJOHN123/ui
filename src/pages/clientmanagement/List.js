import React, { Fragment, useEffect, useState } from "react";
import { Button, Form, Pagination, Spinner, Table } from "react-bootstrap";
import { BsEyeFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";

import {
  clientManagementListAction,
  updateClientAction,
} from "../../store/clientManagementSlice";
import ClientSearchPopup from "./ClientSearchPopup";
import { useNavigate } from "react-router-dom";

const ClientManagement = () => {
  const dispatch = useDispatch();
  const { data = [], count = 0, loading } = useSelector(
    (state) => state.clientManagement
  );
  const navigate = useNavigate()
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

              <th>View</th>
              <th>Name</th>
              <th>Email</th>
              <th>Client ID</th>
              {/* <th>Account Balance</th> */}
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
                  <td >
                    <BsEyeFill
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        navigate(`/client-details/${item.clientId._id}`)
                      }
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item?.clientId?._id || "N/A"}</td>
                  {/* <td>{item?.clientId?.account_balance || "N/A"}</td> */}
                  <td>
                    <span
                      className={`badge ${item.role === "ADMIN" ? "bg-success" : "bg-secondary"
                        }`}
                    >
                      {item.role}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge ${item.status === "ACTIVE" ? "bg-primary" : "bg-danger"
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
                      {/* <FundForm id={item._id} /> */}
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
        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-4">
            <Pagination>
              <Pagination.Prev
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              />

              {/* Show pages dynamically based on the total page count */}
              {totalPages <= 5 ? (
                // If there are 5 or fewer pages, display all pages
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
                  {/* Show first page */}
                  <Pagination.Item
                    key={1}
                    active={page === 1}
                    onClick={() => setPage(1)}
                  >
                    1
                  </Pagination.Item>

                  {/* Show ellipsis if there is a gap between the first and the middle pages */}
                  {page > 3 && <Pagination.Ellipsis disabled />}

                  {/* Show middle pages, but limit the visible pages (3 pages before or after the current page) */}
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

                  {/* Show ellipsis if there is a gap between the middle pages and the last page */}
                  {page < totalPages - 3 && <Pagination.Ellipsis disabled />}

                  {/* Show last page */}
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
    </Fragment>
  );
};

export default ClientManagement;
