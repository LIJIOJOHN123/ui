import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { batchListAction } from "../../store/apiResponseManagement";
import { updateTransactionAction } from "../../store/transactionSlice";
import { Button, Col, Form, Pagination, Row } from "react-bootstrap";
import BatchSearch from "./SearchInput";

const Batch = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [searchQueries, setSearchQueries] = useState({});

  const queryString = Object.entries(searchQueries)
    .filter(([_, value]) => value !== "")
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  useEffect(() => {
    dispatch(batchListAction(page, limit, queryString));
  }, [dispatch, page, limit, queryString]);

  const handleButton = (id, data) => {
    dispatch(updateTransactionAction(id, data));
  };
  const handleLimitChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setLimit(value);
    setPage(1);
  };

  const { batchList, count } = useSelector(
    (state) => state.apiResponseManagement
  );
  return (
    <Fragment>
      <h3>Batch list</h3>

      <div className="d-flex align-items-center mb-4">
        <p className="mb-0 me-3">
          Total: <strong>{count}</strong>
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
        <BatchSearch setSearchQueries={setSearchQueries} />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">View</th>
            <th scope="col">id</th>
            <th scope="col">Type</th>
            <th scope="col">numberofrequest</th>
            <th scope="col">apiGroupId</th>
          </tr>
        </thead>
        <tbody>
          {batchList?.map((item) => {
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
                <td>{item.records}</td>
                <td>{item.apiGroupId}</td>

                <td>
                  {/* {item.status === "ACTIVE" && (
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() =>
                        handleButton(item._id, { status: "INACTIVE" })
                      }
                    >
                      Block<i className="far fa-eye"></i>
                    </button>
                  )} */}
                  {item.status === "INACTIVE" && (
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() =>
                        handleButton(item._id, { status: "ACTIVE" })
                      }
                    >
                      Unblock<i className="far fa-eye"></i>
                    </button>
                  )}
                  {item.role == "ADMIN" && (
                    <button
                      type="button"
                      className="btn btn-primary mr-1"
                      onClick={() => handleButton(item._id, { role: "USER" })}
                    >
                      Remove as admin<i className="far fa-eye"></i>
                    </button>
                  )}
                  {item.role == "USER" && (
                    <button
                      type="button"
                      className="btn btn-primary mr-1"
                      onClick={() => handleButton(item._id, { role: "ADMIN" })}
                    >
                      Add as admin<i className="far fa-eye"></i>
                    </button>
                  )}
                  {/* <FundForm id={item._id} /> */}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Fragment>
  );
};

export default Batch;
