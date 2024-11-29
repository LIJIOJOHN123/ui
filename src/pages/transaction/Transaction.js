import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  transactionListAction,
  updateTransactionAction,
} from "../../store/transactionSlice";
import { Form, Pagination } from "react-bootstrap";
import TransactionSearchPopup from "./TransactionSearchPopup";

const Transaction = () => {
  const dispatch = useDispatch();
  const { data, count } = useSelector((state) => state.transaction);
  const navigate = useNavigate();

  // State variables
  const [searchQueries, setSearchQueries] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  // Construct query string from search queries
  const queryString = Object.entries(searchQueries)
    .filter(([_, value]) => value !== "")
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  // Fetch data whenever page, limit, or query changes
  useEffect(() => {
    dispatch(transactionListAction(page, limit, queryString));
  }, [page, limit, queryString, dispatch]);

  // Handlers
  const handleLimitChange = (e) => {
    const selectedLimit = parseInt(e.target.value, 10);
    setLimit(selectedLimit);
    setPage(1);
  };

  const handleAction = (id, updateData) => {
    dispatch(updateTransactionAction(id, updateData));
  };

  const totalPages = Math.ceil(count / limit);

  return (
    <Fragment>
      <h3>Client List</h3>

      {/* Header Section */}
      <div className="d-flex align-items-center mt-3">
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
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </Form.Select>
        </div>
        <TransactionSearchPopup setSearchQueries={setSearchQueries} />
      </div>

      {/* Table Section */}
      <div className="d-flex flex-column min-vh-100">
        <div className="flex-grow-2">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">View</th>
                <th scope="col">ID</th>
                <th scope="col">Type</th>
                <th scope="col">Mode</th>
                <th scope="col">Amount</th>
                <th scope="col">Description</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.length > 0 ? (
                data.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <i
                        className="bi bi-eye-fill cursor-pointer"
                        onClick={() => navigate(`/client/${item._id}`)}
                      ></i>
                    </td>
                    <td>{item._id}</td>
                    <td>{item.type}</td>
                    <td>{item.mode}</td>
                    <td>{item.amount}</td>
                    <td>{item.description || "N/A"}</td>
                    <td>
                      {item.status === "ACTIVE" ? (
                        <button
                          className="btn btn-primary me-2"
                          onClick={() =>
                            handleAction(item._id, { status: "INACTIVE" })
                          }
                        >
                          Block
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary me-2"
                          onClick={() =>
                            handleAction(item._id, { status: "ACTIVE" })
                          }
                        >
                          Unblock
                        </button>
                      )}
                      {item.role === "ADMIN" ? (
                        <button
                          className="btn btn-warning"
                          onClick={() =>
                            handleAction(item._id, { role: "USER" })
                          }
                        >
                          Remove Admin
                        </button>
                      ) : (
                        <button
                          className="btn btn-success"
                          onClick={() =>
                            handleAction(item._id, { role: "ADMIN" })
                          }
                        >
                          Make Admin
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No Transactions Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
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
    </Fragment>
  );
};

export default Transaction;
