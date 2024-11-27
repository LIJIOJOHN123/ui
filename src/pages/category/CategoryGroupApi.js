import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getCategoryApiListAPIAction,
  updatecategoryAction,
} from "../../store/categorySlice";

function CategoryGroupApi() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Parse query parameters
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const clientId = searchParams.get("clientId");

  const { dataById = [], loading } = useSelector((state) => state.category);
  const { status } = useSelector((state) => state.groupApi);

  const [formData, setFormData] = useState([]);

  // Handle input changes
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    setFormData((prevData) =>
      prevData.map((item, idx) =>
        idx === index ? { ...item, [name]: value } : item
      )
    );
  };

  const handleSwitchChange = (e, index) => {
    const { checked } = e.target;
    setFormData((prevData) =>
      prevData.map((item, idx) =>
        idx === index ? { ...item, discoutedPricing: checked } : item
      )
    );
  };
console.log(formData,"formData")
  const handleSubmit = (e, index, apiGroupApiList) => {
    e.preventDefault();
    const item = formData[index];
    dispatch(updatecategoryAction(apiGroupApiList, { ...item }));

    dispatch(getCategoryApiListAPIAction(id, clientId));
  };

  useEffect(() => {
    dispatch(getCategoryApiListAPIAction(id, clientId));
  }, [id, clientId, dispatch]);

  useEffect(() => {
    if (dataById.length) {
      setFormData(
        dataById.map((item) => ({
          discoutedPricing: item.discoutedPricing || false,
          discoutedPrice: item.discoutedPrice || "",
        }))
      );
    }
  }, [dataById]);

  const headers = [
    "View",
    "Name",
    "Standard Pricing",
    "Fields",
    "Discounted",
    "Discounted Pricing",
    "Action",
  ];

  return (
    <div>
      <h5 className="text-decoration-underline">
        API List Associated with Category
      </h5>

      <table className="table">
        <thead>
          <tr>
            {headers.map((header) => (
              <th scope="col" key={header}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.isArray(dataById) && dataById.length > 0 ? (
            dataById.map((item, index) => (
              <tr key={item._id}>
                <td>
                  <i
                    className="bi bi-eye-fill"
                    onClick={() => navigate(`/client/${item._id || ""}`)}
                  ></i>
                </td>
                <td>{item.apiId?.apiname || "N/A"}</td>
                <td>{item.apiId?.pricing || "N/A"}</td>
                <td>
                  {Array.isArray(item.apiId?.fields)
                    ? item.apiId.fields.join(", ")
                    : "No fields"}
                </td>
                <td>
                  <Form.Group>
                    <Form.Check
                      type="switch"
                      name="discoutedPricing"
                      checked={formData[index]?.discoutedPricing || false}
                      onChange={(e) => handleSwitchChange(e, index)}
                    />
                  </Form.Group>
                </td>
                <td>
                  <Form.Group>
                    <Form.Control
                    disabled={!formData[index]?.discoutedPricing}
                      type="number"
                      name="discoutedPrice"
                      value={formData[index]?.discoutedPrice || ""}
                      onChange={(e) => handleInputChange(e, index)}
                      className="w-25"
                    />
                  </Form.Group>
                </td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={(e) => handleSubmit(e, index, item._id)}
                  >
                    Submit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length}>No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CategoryGroupApi;
