import React, { useEffect, useState } from "react";
import { Form as BootstrapForm, Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import {
  getByIdAPIAction,
  addApiGroupAction,
  updateApiGroupAction,
} from "../../store/apiGroupManagementSlice";
import { apiListAction } from "../../store/apiManagementSlice";
import { fetchValidations } from "../../store/prevalidationSlice";
import { fetchPostValidations } from "../../store/postvalidationSlice";

function CategoryForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    fields: [""],
    field_active: false,
    apiId: [],
    preValidation: [],
    postValidation: [],
  });
  const [error, setError] = useState(false);

  const { data: apiData } = useSelector((state) => state.apiManagement);
  const { data: preValidationData } = useSelector(
    (state) => state.prevalidation
  );
  const { data: postValidationData } = useSelector(
    (state) => state.postvalidation
  );
  const { dataById, loading } = useSelector(
    (state) => state.apiGroupManagement
  );

  // Fetch Data on Mount
  useEffect(() => {
    dispatch(fetchValidations());
    dispatch(fetchPostValidations());
    if (!apiData.length) dispatch(apiListAction());
    if (id) dispatch(getByIdAPIAction(id));
  }, [id, dispatch]);

  // Populate Form Data for Edit
  useEffect(() => {
    if (id && dataById) {
      setFormData({
        name: dataById.name || "",
        description: dataById.description || "",
        fields: dataById.fields?.length ? dataById.fields : [""],
        field_active: dataById.field_active || false,
        apiId: dataById.apiId || [],
        preValidation: dataById.preValidation || [],
        postValidation: dataById.postValidation || [],
      });
    }
  }, [id, dataById]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFieldChange = (index, value) => {
    const updatedFields = [...formData.fields];
    updatedFields[index] = value;
    setFormData((prevData) => ({ ...prevData, fields: updatedFields }));
  };

  const addField = () => {
    if (formData.fields[formData.fields.length - 1] === "") {
      setError(true);
      return;
    }
    setFormData((prevData) => ({
      ...prevData,
      fields: [...prevData.fields, ""],
    }));
  };

  const handleSelectChange = (selected, field) => {
    console.log(selected, field, "selected, field");
    const selectedIds = selected?.map((item) => item.value) || [];

    console.log(selectedIds)
    setFormData((prevData) => ({ ...prevData, [field]: selectedIds }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      setError(true);
      return;
    }

    if (id) {
      dispatch(updateApiGroupAction(id, formData));
    } else {
      dispatch(addApiGroupAction(formData));
    }
    navigate("/api-groups");
  };

  const renderFieldInputs = () =>
    formData.fields.map((field, index) => (
      <Row key={index} className="mb-2">
        <Col xs={10}>
          <BootstrapForm.Control
            type="text"
            placeholder="Enter field"
            value={field}
            onChange={(e) => handleFieldChange(index, e.target.value)}
            isInvalid={error && index === formData.fields.length - 1 && !field}
          />
        </Col>
      </Row>
    ));

  const renderSelect = (label, options, value, field) => (
    <BootstrapForm.Group className="mt-3">
      <BootstrapForm.Label>{label}</BootstrapForm.Label>
      <Select
        isMulti
        options={options}
        value={options.filter((opt) => value.includes(opt.value))}
        onChange={(selected) => handleSelectChange(selected, field)}
        placeholder={`Select ${label}...`}
      />
    </BootstrapForm.Group>
  );

  const apiOptions = apiData.map((item) => ({
    value: item._id,
    label: item.apiname,
  }));
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
        <h4>{id ? "Edit API Group" : "Create API Group"}</h4>
        <Button onClick={() => navigate("/api-groups")} className="fw-bold">
          Back
        </Button>
      </div>
      <div className="mt-4 bg-body-secondary rounded-2 p-3">
        <BootstrapForm onSubmit={handleSubmit}>
          <BootstrapForm.Group controlId="formName">
            <BootstrapForm.Label>Name</BootstrapForm.Label>
            <BootstrapForm.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              isInvalid={error && !formData.name}
              required
            />
            <BootstrapForm.Control.Feedback type="invalid">
              Name is required.
            </BootstrapForm.Control.Feedback>
          </BootstrapForm.Group>

          <BootstrapForm.Group className="mt-3" controlId="formDescription">
            <BootstrapForm.Label>Description</BootstrapForm.Label>
            <BootstrapForm.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </BootstrapForm.Group>

          <BootstrapForm.Group className="mt-3">
            <div className="d-flex align-items-center">
              <BootstrapForm.Label className="me-2">
                Add Fields
              </BootstrapForm.Label>
              <BootstrapForm.Check
                type="switch"
                name="field_active"
                checked={formData.field_active}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    field_active: e.target.checked,
                  }))
                }
              />
            </div>
          </BootstrapForm.Group>

          {formData.field_active && (
            <BootstrapForm.Group className="mt-3">
              {renderFieldInputs()}
            </BootstrapForm.Group>
          )}

          {formData.field_active && (
            <Button className="mt-2" onClick={addField}>
              Add Field
            </Button>
          )}

          {renderSelect("APIs", apiOptions, formData.apiId, "apiId")}
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
          

          <Button type="submit" className="mt-4" variant="primary">
            Submit
          </Button>
        </BootstrapForm>
      </div>
    </div>
  );
}

export default CategoryForm;
