import React, { useEffect, useState } from "react";
import { Alert, Form as BootstrapForm, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  addPostValidation,
  fetchPostValidationById,
  updatePostValidation,
} from "../../store/postvalidationSlice";

function PostValidationForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    des: "",
    clientVisibility: false,
    validation_key: "",
  });

  const [validationErrors, setValidationErrors] = useState({});

  const {
    loading,
    status: submissionStatus,
    dataById,
  } = useSelector((state) => state.postvalidation);

  useEffect(() => {
    if (id) {
      dispatch(fetchPostValidationById(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (id && dataById) {
      setFormData(dataById);
    }
  }, [id, dataById]);

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = "Post Validation Name is required.";
    }
    if (!formData.validation_key.trim()) {
      errors.validation_key = "Post Validation Key is required.";
    }
    return errors;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    if (id) {
      dispatch(updatePostValidation(id, formData));
    } else {
      dispatch(addPostValidation(formData));
    }

    if (submissionStatus === "ok") {
      navigate(-1);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h4>{id ? "Edit Post Validation" : "Create Post Validation"}</h4>
        <Button onClick={() => navigate("/pre-validation")} className="fw-bold">
          Back
        </Button>
      </div>
      <div className="mt-4 bg-body-secondary rounded-2 p-3">
        <BootstrapForm onSubmit={handleSubmit}>
          {/* Name Field */}
          <BootstrapForm.Group controlId="formName">
            <BootstrapForm.Label>Post Validation Name</BootstrapForm.Label>
            <BootstrapForm.Control
              type="text"
              placeholder="Enter Post Validation Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              isInvalid={!!validationErrors.name}
            />
            <BootstrapForm.Control.Feedback type="invalid">
              {validationErrors.name}
            </BootstrapForm.Control.Feedback>
          </BootstrapForm.Group>

          {/* Description Field */}
          <BootstrapForm.Group className="mt-3" controlId="formDescription">
            <BootstrapForm.Label>
              Post Validation Description
            </BootstrapForm.Label>
            <BootstrapForm.Control
              as="textarea"
              rows={3}
              placeholder="Enter Post Validation Description"
              name="des"
              value={formData.des}
              onChange={handleInputChange}
            />
          </BootstrapForm.Group>

          {/* Client Visibility Switch */}
          <BootstrapForm.Group
            className="mt-3"
            controlId="formClientVisibility"
          >
            <BootstrapForm.Check
              type="switch"
              label="Client Visibility"
              name="clientVisibility"
              checked={formData.clientVisibility}
              onChange={handleInputChange}
            />
          </BootstrapForm.Group>

          {/* Post Validation Key */}
          <BootstrapForm.Group className="mt-3" controlId="formValidationKey">
            <BootstrapForm.Label>Post Validation Key</BootstrapForm.Label>
            <BootstrapForm.Control
              type="text"
              placeholder="Enter Post Validation Key"
              name="validation_key"
              value={formData.validation_key}
              onChange={handleInputChange}
              isInvalid={!!validationErrors.validation_key}
            />
            <BootstrapForm.Control.Feedback type="invalid">
              {validationErrors.validation_key}
            </BootstrapForm.Control.Feedback>
          </BootstrapForm.Group>

          {/* Submit Button */}
          <Button variant="primary" type="submit" className="mt-4">
            {loading ? <div className="spinner-border" /> : "Submit"}
          </Button>
        </BootstrapForm>

        {/* Error Alert */}
        {submissionStatus !== "ok" && (
          <Alert variant="danger" className="mt-3">
            An error occurred while submitting the form. Please try again.
          </Alert>
        )}
      </div>
    </div>
  );
}

export default PostValidationForm;
