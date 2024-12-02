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
  const [limit, setLimit] = useState(5);

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
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
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
                <th scope="col">View</th>
                <th scope="col">id</th>
                <th scope="col">Type</th>
                <th scope="col">mode</th>
                <th scope="col">Amount</th>
                <th scope="col">decription</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item) => {
                return (
                  <tr key={item._id}>
                    <td>
                      <i
                        className="bi bi-eye-fill"
                        onClick={() => navigate(`/client/${item._id}`)}
                      ></i>
                    </td>
                    <td>{item._id}</td>
                    <td>{item.type}</td>
                    <td>{item.mode}</td>
                    <td>{item.amount}</td>
                    <td>{item.decription}</td>
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
            {/* {[...Array(totalPages)].map((_, idx) => (
              <Pagination.Item
                key={idx}
                active={page === idx + 1}
                onClick={() => setPage(idx + 1)}
              >
                {idx + 1}
              </Pagination.Item>
            ))} */}
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
