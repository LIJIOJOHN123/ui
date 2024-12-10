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
  const { user: userData } = useSelector((state) => state.auth)
  const navigate = useNavigate();
  // const handleButton = (id, data) => {
  //   dispatch(updateTransactionAction(id, data));
  // };

  const [searchQueries, setSearchQueries] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);

  const queryString = Object.entries(searchQueries)
    .filter(([_, value]) => value !== "")
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  useEffect(() => {
    dispatch(transactionListAction(page, limit, queryString));
  }, [page, limit, dispatch, queryString]);
  const handleLimitChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setLimit(value);
    setPage(1);
  };
  const totalPages = count && limit ? Math.ceil(count / limit) : 1;
  return (
    <Fragment>
      <h3>Client list</h3>

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

        <TransactionSearchPopup setSearchQueries={setSearchQueries} />
        {userData.role === "USER" && (
          <p className="ms-auto">
            Blance:<span className="fw-bold">{userData.account_balance}</span>
          </p>
        )}
      </div>
      <div className="d-flex flex-column min-vh-100">
        <div className="flex-grow-2">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">Type</th>
                <th scope="col">mode</th>
                <th scope="col">Amount</th>
                <th scope="col">description</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item) => {
                return (
                  <tr key={item._id}>
                    <td>{item._id}</td>
                    <td>{item.type}</td>
                    <td>{item.mode}</td>
                    <td>{item.amount}</td>
                    <td>{item.description}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
    </Fragment>
  );
};

export default Transaction;
