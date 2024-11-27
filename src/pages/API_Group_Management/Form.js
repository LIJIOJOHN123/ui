import React, { useEffect, useState } from "react";
import { Form as BootstrapForm, Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { apiListAction } from "../../store/apiManagementSlice";
import {
  getByIdAPIAction,
  addApiGroupAction,
  updateApiGroupAction
} from "../../store/apiGroupManagementSlice";
import {  } from "../../store/productManagementSlice";

function CategoryForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [selectedValues, setSelectedValues] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    fields: [""],
    field_active: false,
    apiId: [],
  });
  const [error, setError] = useState(false);

  const { loading, status, dataById } = useSelector((state) => state.apiGroupManagement);
  const { data: apiData } = useSelector((state) => state.apiManagement);
  console.log(apiData);
  useEffect(() => {
    if (id) dispatch(getByIdAPIAction(id));
  }, [id]);

  const filteredData = apiData.filter((item) =>
    dataById?.apiId?.includes(item._id)
  );
  useEffect(() => {
    if (id && dataById) {
      setFormData({
        name: dataById.name || "",
        description: dataById.description || "",
        fields: !dataById.fields?.length
          ? [""]
          : (dataById.fields || [""]).filter((field) => field.trim() !== ""),
        apiId: dataById?.apiId?.map((item) => item) || [],
        field_active: dataById?.field_active,
      });

      setSelectedValues(
        filteredData?.map((item) => ({
          value: item._id,
          label: item.apiname,
        })) || []
      );
    }
  }, [id, dataById]);

  useEffect(() => {
    if (!apiData.length && !loading) dispatch(apiListAction());
  }, [apiData, loading, dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSelectChange = (selected) => {
    const selectedIds = selected?.map((item) => item.value) || [];
    setSelectedValues(selected);
    setFormData((prevData) => ({ ...prevData, apiId: selectedIds }));
    setError(selectedIds.length === 0);
  };

  const handleFieldChange = (index, value) => {
    const updatedFields = [...formData.fields];
    updatedFields[index] = value;
    setFormData((prevData) => ({ ...prevData, fields: updatedFields }));
    if (value) setError(false);
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
    if (status === "ok") navigate("/category");
  };

  const options = apiData?.map((item) => ({
    value: item._id,
    label: item.apiname,
  }));

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h4>{id ? "Edit Category" : "Create Category"}</h4>
        <Button onClick={() => navigate("/category")} className="fw-bold">
          Back
        </Button>
      </div>
      <div className="mt-4 bg-body-secondary rounded-2 p-3">
        <BootstrapForm onSubmit={handleSubmit}>
          <BootstrapForm.Group controlId="formCategoryName">
            <BootstrapForm.Label>Category Name</BootstrapForm.Label>
            <BootstrapForm.Control
              type="text"
              placeholder="Enter category name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              isInvalid={error && !formData.name}
            />
            <BootstrapForm.Control.Feedback type="invalid">
              Category name is required.
            </BootstrapForm.Control.Feedback>
          </BootstrapForm.Group>

          <BootstrapForm.Group className="mt-3" controlId="formDescription">
            <BootstrapForm.Label>Description</BootstrapForm.Label>
            <BootstrapForm.Control
              as="textarea"
              rows={3}
              placeholder="Enter description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </BootstrapForm.Group>
          <BootstrapForm.Group className="mt-3" controlId="formAddFields">
            <div className="d-flex ">
              <BootstrapForm.Label className="me-2">
                Add Fields
              </BootstrapForm.Label>
              <BootstrapForm.Check
                type="switch"
                id="AddFieldsToggle"
                name="field_active"
                // label={formData.field_active ? "Enabled" : "Disabled"}
                checked={formData.field_active}
                onChange={(e) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    field_active: e.target.checked ? true : false,
                  }))
                }
              />
            </div>
          </BootstrapForm.Group>

          {formData.field_active && (
            <BootstrapForm.Group className="mt-3" controlId="formFields">
              <BootstrapForm.Label>Fields</BootstrapForm.Label>
              {formData.fields.map((field, index) => (
                <Row key={index}>
                  <Col xs={9}>
                    <BootstrapForm.Control
                      // disabled={!formData.field_active}
                      type="text"
                      placeholder="Enter field"
                      value={field}
                      onChange={(e) => handleFieldChange(index, e.target.value)}
                      required={!id && !formData.field_active}
                      isInvalid={
                        error &&
                        index === formData.fields.length - 1 &&
                        field === ""
                      }
                    />
                  </Col>
                </Row>
              ))}
              <Button className="mt-2" onClick={addField}>
                Add Field
              </Button>
            </BootstrapForm.Group>
          )}
          <BootstrapForm.Group className="mt-3" controlId="formApiSelect">
            <BootstrapForm.Label>Select APIs</BootstrapForm.Label>
            <Select
              isMulti
              options={options}
              value={selectedValues}
              onChange={handleSelectChange}
              placeholder="Select APIs..."
            />
          </BootstrapForm.Group>

          <Button type="submit" className="mt-4" variant="primary">
            {loading ? (
              <span className="spinner-border spinner-border-sm" />
            ) : (
              "Submit"
            )}
          </Button>
        </BootstrapForm>
      </div>
    </div>
  );
}

export default CategoryForm;
