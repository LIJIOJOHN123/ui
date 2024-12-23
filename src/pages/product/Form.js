import Select from "react-select";
import React, { useEffect, useState } from "react";
import { Form as BootstrapForm, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { clientManagementListAction } from "../../store/clientManagementSlice";
import {
  addproductAction,
  getByIdAPIAction,
  updateproductAction,
} from "../../store/productManagementSlice";
import {
  ApiGroupAction,
  getByIdAPIAction as groupPlan,
} from "../../store/apiGroupManagementSlice";
import { fetchValidations } from "../../store/prevalidationSlice";
import { fetchPostValidations } from "../../store/postvalidationSlice";

function GroupApiForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    clientId: "",
    name: "",
    des: "",
    apiGroupId: "",
    api: [],
    preValidation: [],
    postValidation: [],
  });

  const [apiList, setApiList] = useState([]);

  const { loading, status, dataById } = useSelector(
    (state) => state.productManagement
  );

  const clientData = useSelector((state) => state.clientManagement.data);
  const apiGroupData = useSelector((state) => state.apiGroupManagement.data);
  const apiData = useSelector((state) => state.apiGroupManagement.dataById);

  console.log(apiData.apiId, "apiGroupData");
  const { data: preValidationData } = useSelector(
    (state) => state.prevalidation
  );
  const { data: postValidationData } = useSelector(
    (state) => state.postvalidation
  );

  useEffect(() => {
    if (id) {
      dispatch(getByIdAPIAction(id));
    }

    dispatch(fetchValidations());
    dispatch(fetchPostValidations());
    dispatch(clientManagementListAction());
    dispatch(ApiGroupAction());
  }, [id, dispatch]);
  useEffect(() => {
    if (formData.apiGroupId) {
      dispatch(groupPlan(formData.apiGroupId));
    }
  }, [formData.apiGroupId, dispatch]);

  const handleSelectChange = (selected, field) => {
    const selectedIds = selected?.map((item) => item.value) || [];
    setFormData((prevData) => ({ ...prevData, [field]: selectedIds }));
  };

  useEffect(() => {
    if (id && dataById) {
      setFormData({
        clientId: dataById.clientId || "",
        apiGroupId: dataById.apiGroupId || "",
        name: dataById.name || "",
        des: dataById.des || "",
        preValidation: dataById.preValidation || [],
        postValidation: dataById.postValidation || [],
      });

      if (dataById?.api?.length) {
        setApiList(
          dataById.api.map((item) => ({
            apiId: item.apiId._id,
            apiname: item.apiId.apiname,
            pricing: item.apiId.pricing || "N/A",
            fields: item.apiId.fields || [],
            standardPricing: item.standardpricing || false,
            discoutedPricing: item.discoutedPricing || false,
            discoutedPrice: item.discoutedPrice || "",
            id: item._id,
          }))
        );
      }
    }
  }, [id, dataById]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle switch toggle
  const handleSwitchChange = (e, index) => {
    const { checked } = e.target;
    setApiList((prevApiList) =>
      prevApiList.map((api, i) =>
        i === index ? { ...api, discoutedPricing: checked } : api
      )
    );
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      dispatch(updateproductAction(id, { ...formData }));
    } else {
      dispatch(addproductAction(formData.apiGroupId, { ...formData }));
    }

    if (status === "ok") {
      navigate("/products");
    }
  };

  // Handle row form submission (for API specific details)
  const handleRowSubmit = (e, index, id) => {
    e.preventDefault();
    const item = apiList[index];

    setFormData((prevData) => {
      const updatedApiData = Array.isArray(prevData.api)
        ? [...prevData.api]
        : [];

      if (!item.discoutedPricing) {
        // Remove the API entry if discounted pricing is not enabled
        const apiIndex = updatedApiData.findIndex(
          (data) => data.apiId === item.apiId
        );
        updatedApiData.push({ id: id, discoutedPrice: "" });
        if (apiIndex !== -1) updatedApiData.splice(apiIndex, 1);
        item.discoutedPrice = ""; // Clear the discounted price
      } else {
        // Add or update the API entry
        const existingApiIndex = updatedApiData.findIndex(
          (data) => data.apiId === item.apiId
        );
        if (existingApiIndex !== -1) {
          updatedApiData[existingApiIndex] = {
            ...updatedApiData[existingApiIndex],
            discoutedPrice: item.discoutedPrice,
          };
        } else {
          updatedApiData.push({
            apiId: item.apiId,
            id: id,
            discoutedPrice: item.discoutedPrice,
          });
        }
      }

      return { ...prevData, api: updatedApiData };
    });
  };

  const renderSelect = (label, options = [], value, field) => (
    <BootstrapForm.Group className="mt-3">
      <BootstrapForm.Label>{label}</BootstrapForm.Label>
      <Select
        isMulti
        options={options}
        value={options.filter((opt) => value?.includes(opt.value))}
        onChange={(selected) => handleSelectChange(selected, field)}
        placeholder={`Select ${label}...`}
      />
    </BootstrapForm.Group>
  );

  const validationOptions = preValidationData.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const postValidationOptions = postValidationData.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h4>{id ? "Edit Product" : "Create Product"}</h4>
        <Button onClick={() => navigate("/products")} className="fw-bold">
          Back
        </Button>
      </div>
      <div className="mt-4 bg-body-secondary rounded-2 p-3">
        <BootstrapForm onSubmit={handleSubmit}>
          <BootstrapForm.Group controlId="formGroupName" className="mt-3">
            <BootstrapForm.Label className="m-0">Name</BootstrapForm.Label>
            <BootstrapForm.Control
              type="text"
              placeholder="Enter group name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </BootstrapForm.Group>
          <BootstrapForm.Group controlId="formClient">
            <BootstrapForm.Label className="m-0">
              Add API Group
            </BootstrapForm.Label>
            <BootstrapForm.Control
              as="select"
              name="apiGroupId"
              value={formData.apiGroupId}
              onChange={handleInputChange}
              required
            >
              <option disabled value="">
                Select API Group
              </option>
              {apiGroupData.map((group) => (
                <option key={group._id} value={group._id}>
                  {group.name}
                </option>
              ))}
            </BootstrapForm.Control>
          </BootstrapForm.Group>

          {renderSelect(
            "Pre-Validations",
            validationOptions,
            formData.preValidation,
            "preValidation"
          )}
          {renderSelect(
            "Post-Validations",
            postValidationOptions,
            formData.postValidation,
            "postValidation"
          )}

          {!id && (
            <BootstrapForm.Group controlId="formClient">
              <BootstrapForm.Label className="m-0">
                Add Client
              </BootstrapForm.Label>
              <BootstrapForm.Control
                as="select"
                name="clientId"
                value={formData.clientId}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Client</option>
                {clientData.map((client) => (
                  <option key={client._id} value={client._id}>
                    {client.name}
                  </option>
                ))}
              </BootstrapForm.Control>
            </BootstrapForm.Group>
          )}

          <BootstrapForm.Group
            controlId="formGroupDescription"
            className="mt-3"
          >
            <BootstrapForm.Label className="m-0">
              Group Description
            </BootstrapForm.Label>
            <BootstrapForm.Control
              as="textarea"
              rows={3}
              placeholder="Enter group description"
              name="des"
              value={formData.des}
              onChange={handleInputChange}
            />
          </BootstrapForm.Group>

          {apiData.apiId && (
            <div className="mt-3">
              <h5 className="text-decoration-underline">
                List of APIs Associated with this Group
              </h5>
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Standard Pricing</th>
                    <th>Fields</th>
                    <th>Backend Api key Name</th>
                  </tr>
                </thead>
                <tbody>
                  {apiData.apiId.map((item, i) => (
                    <tr key={i} className="">
                      <td>{item.apiname}</td>
                      <td>{item.pricing}</td>
                      <td>{item.fields.join(", ")}</td>
                      <td>{item.backend_api_key_name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {apiList.length > 0 && (
            <div className="mt-3">
              <h5 className="text-decoration-underline">
                API List Associated with Category
              </h5>
              <table className="table">
                <thead>
                  <tr>
                    <th>View</th>
                    <th>Name</th>
                    <th>Standard Pricing</th>
                    <th>Fields</th>
                    <th>Discounted</th>
                    <th>Discounted Pricing</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {apiList.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <i
                          className="bi bi-eye-fill"
                          onClick={() => navigate(`/client/${item.apiId}`)}
                        ></i>
                      </td>
                      <td>{item.apiname}</td>
                      <td>{item.pricing}</td>
                      <td>{item.fields.join(", ")}</td>
                      <td>
                        <BootstrapForm.Check
                          type="switch"
                          checked={item.discoutedPricing}
                          onChange={(e) => handleSwitchChange(e, index)}
                        />
                      </td>
                      <td>
                        <BootstrapForm.Control
                          disabled={!item.discoutedPricing}
                          type="number"
                          value={item.discoutedPrice || ""}
                          onChange={(e) => {
                            const { value } = e.target;
                            setApiList((prevApiList) =>
                              prevApiList.map((api, i) =>
                                i === index
                                  ? { ...api, discoutedPrice: value }
                                  : api
                              )
                            );
                          }}
                          className="form-control-sm"
                        />
                      </td>
                      <td>
                        <Button
                          onClick={(e) => handleRowSubmit(e, index, item.id)}
                          variant="primary"
                        >
                          Update
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="d-flex justify-content-between mt-4">
            <Button type="submit" className="fw-bold">
              {id ? "Update" : "Create"}
            </Button>
          </div>
        </BootstrapForm>
      </div>
    </div>
  );
}

export default GroupApiForm;
