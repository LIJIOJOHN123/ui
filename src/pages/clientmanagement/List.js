import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clientManagementListAction,
  updateClientAction,
} from "../../store/clientManagementSlice";
import { useNavigate } from "react-router-dom";
import FundForm from "./FundForm";

const ClientManagement = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.clientManagement.data);
  React.useEffect(() => {
    dispatch(clientManagementListAction());
  }, []);
  const navigate = useNavigate();
  const handleButton = (id, data) => {
    dispatch(updateClientAction(id, data));
  };
  return (
    <Fragment>
      <h3>Client list</h3>
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
                  <FundForm/>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ClientManagement;
