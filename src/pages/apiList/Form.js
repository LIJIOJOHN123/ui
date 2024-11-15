import React, { useEffect, useState } from "react";
import { Form as BootstrapForm, Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  addApiAction,
  getByIdAPIAction,
  updateApiAction,
} from "../../store/apiSlice";

function Form() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    apiname: "",
    des: "",
    fields: [""],
    pricing: "",
    backend_api_key_name: "",
    api_type: "",
  });
  const [error, setError] = useState(false);
  const { loading, status, dataById } = useSelector((state) => state.apiList);
  useEffect(() => {
    if (id) {
      dispatch(getByIdAPIAction(id));
    }
  }, [id]);

  useEffect(() => {
    if (id && dataById) {
      setFormData(dataById);
    }
  }, [id, dataById]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleAddField = () => {
    if (formData.fields[formData.fields.length - 1] === "") {
      setError(true);
      return;
    }
    setFormData((prevData) => ({
      ...prevData,
      fields: [...prevData.fields, ""],
    }));
  };

  const handleFieldValueChange = (index, value) => {
    const updatedFields = [...formData.fields];
    updatedFields[index] = value;
    setFormData((prevData) => ({
      ...prevData,
      fields: updatedFields,
    }));

    if (value !== "") {
      setError(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      dispatch(updateApiAction(id, formData));
    } else {
      dispatch(addApiAction(formData));
    }

    if (status === "ok") {
      navigate("/api-list");
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h4>{id ? "Edit API" : "Create API"}</h4>
        <Button onClick={() => navigate("/api-list")} className="fw-bold">
          Back
        </Button>
      </div>
      <div className="mt-4 bg-body-secondary rounded-2 p-3">
        <BootstrapForm onSubmit={handleSubmit}>
          <BootstrapForm.Group controlId="formApiName">
            <BootstrapForm.Label className="m-0">API Name</BootstrapForm.Label>
            <BootstrapForm.Control
              type="text"
              placeholder="Enter API name"
              name="apiname"
              value={formData.apiname}
              onChange={handleInputChange}
              required
            />
          </BootstrapForm.Group>

          <BootstrapForm.Group className="mt-3" controlId="formApiDescription">
            <BootstrapForm.Label className="m-0">
              API Description
            </BootstrapForm.Label>
            <BootstrapForm.Control
              as="textarea"
              rows={3}
              placeholder="Enter API description"
              name="des"
              value={formData.des}
              onChange={handleInputChange}
            />
          </BootstrapForm.Group>

          <BootstrapForm.Group className="mt-3" controlId="formApiFields">
            <BootstrapForm.Label className="m-0">Fields</BootstrapForm.Label>
            {formData?.fields?.map((field, index) => (
              <Row className="" key={index}>
                <Col xs={4}>
                  <BootstrapForm.Control
                    type="text"
                    placeholder="Enter key"
                    className={` mb-2 ${
                      error && index === formData.fields.length - 1
                        ? "shake is-invalid"
                        : ""
                    }`} // Add shake and is-invalid classes if conditions are met
                    value={field}
                    onChange={(e) =>
                      handleFieldValueChange(index, e.target.value)
                    }
                    required
                  />
                </Col>
              </Row>
            ))}

            <div className="d-flex justify-content-end">
              <Button className=" " onClick={handleAddField}>
                Add
              </Button>
            </div>
          </BootstrapForm.Group>

          <BootstrapForm.Group className="mt-3" controlId="formApiKeyoiiyufthf">
            <BootstrapForm.Label className="m-0">API Type</BootstrapForm.Label>
            <BootstrapForm.Select
              name="api_type"
              value={formData.api_type}
              onChange={handleInputChange}
              required
            >
              <option value="">Select API type</option>
              <option value="LIVE">Live</option>
              <option value="DEMO">Demo</option>
              <option value="INTERNAL">Internal</option>
              {/* Add more options as needed */}
            </BootstrapForm.Select>
          </BootstrapForm.Group>

          <BootstrapForm.Group className="mt-3" controlId="formApiKey">
            <BootstrapForm.Label className="m-0">
              Backend API Key Name
            </BootstrapForm.Label>
            <BootstrapForm.Control
              type="text"
              placeholder="Enter backend API key name"
              name="backend_api_key_name"
              value={formData.backend_api_key_name}
              onChange={handleInputChange}
              required
            />
          </BootstrapForm.Group>

          <BootstrapForm.Group className="mt-3" controlId="formPricing">
            <BootstrapForm.Label className="m-0">Pricing</BootstrapForm.Label>
            <BootstrapForm.Control
              type="number"
              placeholder="Enter pricing"
              name="pricing"
              value={formData.pricing}
              onChange={handleInputChange}
              required
              autoComplete="off"
            />
          </BootstrapForm.Group>

          <Button variant="primary" type="submit" className="mt-4">
            {loading ? <div className="spinner-border" /> : <div>Submit</div>}
          </Button>
        </BootstrapForm>
      </div>
    </div>
  );
}

export default Form;
