import React, { Fragment, useEffect, useState } from "react";
import { Form, Pagination } from "react-bootstrap";
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
  const [limit, setLimit] = useState(5);
  console.log(searchQueries);
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

        <ClientSearchPopup setSearchQueries={setSearchQueries} />
      </div>

      <div className="d-flex flex-column min-vh-100">
        <div className="flex-grow-2">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">View</th>
                <th scope="col">id</th>
                <th scope="col">Name</th>
                <th scope="col">email</th>
                <th scope="col">role</th>
                <th scope="col">actions</th>
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
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.role}</td>
                    <td>
                      {item.status === "ACTIVE" && (
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() =>
                            handleButton(item._id, { status: "INACTIVE" })
                          }
                        >
                          Block<i className="far fa-eye"></i>
                        </button>
                      )}
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
                          onClick={() =>
                            handleButton(item._id, { role: "USER" })
                          }
                        >
                          Remove as admin<i className="far fa-eye"></i>
                        </button>
                      )}
                      {item.role == "USER" && (
                        <button
                          type="button"
                          className="btn btn-primary mr-1"
                          onClick={() =>
                            handleButton(item._id, { role: "ADMIN" })
                          }
                        >
                          Add as admin<i className="far fa-eye"></i>
                        </button>
                      )}
                      <FundForm id={item._id} />
                    </td>
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

export default ClientManagement;
