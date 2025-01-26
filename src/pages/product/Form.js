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
    if (formData.apiGroupId._id) {
      dispatch(groupPlan(formData.apiGroupId._id));
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
        preValidation: dataById?.preValidation?.map((item) => item._id) ?? [],
        postValidation: dataById?.postValidation?.map((item) => item._id) ?? [],
      });
    }
  }, [id, dataById]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
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
                  <option key={client?.clientId?._id} value={client?.clientId?._id}>
                    {client.name}
                  </option>
                ))}
              </BootstrapForm.Control>
            </BootstrapForm.Group>
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
