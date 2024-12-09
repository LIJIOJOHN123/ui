import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { batchListAction } from "../../store/apiResponseManagement";
import { updateTransactionAction } from "../../store/transactionSlice";

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

  const { batchList } = useSelector((state) => state.apiResponseManagement);;
  return (
    <Fragment>
      <h3>Client list</h3>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">View</th>
            <th scope="col">id</th>
            <th scope="col">Type</th>
            <th scope="col">numberofrequest</th>
            <th scope="col">apiGroupId</th>

            <th scope="col">actions</th>
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
