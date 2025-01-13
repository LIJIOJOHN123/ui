import Select from "react-select";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Form as BootstrapForm,
  Button,
  Col,
  Row,
  Table,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  ApiGroupAction,
  getByIdAPIAction,
} from "../../store/apiGroupManagementSlice";
import {
  addplanAction,
  getByIdPlanAction,
  updateplanAction,
} from "../../store/planSlice";
import { fetchValidations } from "../../store/prevalidationSlice";
import { fetchPostValidations } from "../../store/postvalidationSlice";

function PlanForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    des: "",
    apigroupId: "",
    numberofapi: "",
    numberofsuccessfulapiResponse: "",
    credit: "",
    pricing: "",
    planstatus: "",
    indexofplan: "",
    api: [],
    preValidation: [],
    postValidation: [],
  });

  const [apiList, setApiList] = useState([]);
  const [formError, setFormError] = useState(false);

  
  const { data: preValidationData } = useSelector(
    (state) => state.prevalidation
  );
  const { data: postValidationData } = useSelector(
    (state) => state.postvalidation
  );
  const apiGroupData = useSelector((state) => state.apiGroupManagement.data);
  const apiGroupdataById = useSelector(
    (state) => state.apiGroupManagement.dataById
  );
  const { dataById } = useSelector((state) => state.plan);

  useEffect(() => {
    dispatch(fetchValidations());
    dispatch(fetchPostValidations());
    dispatch(ApiGroupAction());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(getByIdPlanAction(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (dataById && id) {
      setFormData(dataById);
    }
  }, [dataById, id]);

  useEffect(() => {
    if (formData.apigroupId) {
      dispatch(getByIdAPIAction(formData.apigroupId));
    }
  }, [dispatch, formData.apigroupId]);

  useEffect(() => {
    if (
      apiGroupdataById?.apiId &&
      !id &&
      Array.isArray(apiGroupdataById.apiId)
    ) {
      setApiList(
        apiGroupdataById.apiId.map((item) => ({
          id: item._id,
          name: item.apiname,
          pricing: item.pricing || "N/A",
          fields: item.fields || [],
          discountedPricing: false,
          discountedPrice: "",
        }))
      );
    }
  }, [apiGroupdataById, id]);

  useEffect(() => {
    if (dataById && id && Array.isArray(dataById.api)) {
      setApiList(
        dataById?.api?.map((item, i) => ({
          id: item._id,
          name: item.apiId?.apiname || "",
          pricing: item.apiId?.pricing || "N/A",
          fields: item.apiId?.fields || [],
          discountedPricing: item.discoutedPricing || false,
          discountedPrice: item.discoutedPrice || "",
        }))
      );
    }
  }, [dataById, id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (selected, field) => {
    const selectedIds = selected?.map((item) => item.value) || [];
    setFormData((prevData) => ({ ...prevData, [field]: selectedIds }));
  };

  const renderSelect = (label, options, value = [], field) => (
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

  const validationOptions = preValidationData.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const postValidationOptions = postValidationData.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const validateForm = () => {
    const requiredFields = ["name", "apigroupId"];
    const isValid = requiredFields.every((field) => formData[field]?.trim());
    setFormError(!isValid);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const updatedFormData = {
      ...formData,
      api: apiList,
    };

    if (id) {
      dispatch(updateplanAction(id, updatedFormData));
    } else {
      dispatch(addplanAction(updatedFormData));
    }

    navigate(-1);
  };

  const handleSwitchChange = (index, checked) => {
    setApiList((prevApiList) =>
      prevApiList.map((api, i) =>
        i === index ? { ...api, discountedPricing: checked } : api
      )
    );
  };

  const handleRowSubmit = (index) => {
    const item = apiList[index];

    if (item.discountedPricing) {
      const updatedItem = {
        ...item,
        discountedPrice: item.discountedPrice || item.pricing,
      };

      setApiList((prevApiList) =>
        prevApiList.map((api, i) => (i === index ? updatedItem : api))
      );
    } else {
      const updatedItem = {
        ...item,
        discountedPrice: "",
      };

      setApiList((prevApiList) =>
        prevApiList.map((api, i) => (i === index ? updatedItem : api))
      );
    }

    setFormData((prevData) => ({
      ...prevData,
      api: apiList.filter((item) => item.discountedPricing),
    }));
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4>{id ? "Edit Plan" : "Create Plan"}</h4>
        <Button variant="secondary" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>

      <div className="p-4 bg-light rounded">
        {formError && (
          <Alert variant="danger">Please fill in all required fields.</Alert>
        )}
        <BootstrapForm onSubmit={handleSubmit}>
          <BootstrapForm.Group controlId="formPlanName">
            <BootstrapForm.Label>Plan Name</BootstrapForm.Label>
            <BootstrapForm.Control
              type="text"
              placeholder="Enter plan name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              isInvalid={formError && !formData.name}
              required
            />
          </BootstrapForm.Group>

          <BootstrapForm.Group className="mt-3" controlId="formPlanDescription">
            <BootstrapForm.Label>Plan Description</BootstrapForm.Label>
            <BootstrapForm.Control
              as="textarea"
              rows={3}
              placeholder="Enter plan description"
              name="des"
              value={formData.des}
              onChange={handleInputChange}
            />
          </BootstrapForm.Group>

          {/* <Row className="mt-3">
            <Col sm={6}>
              <BootstrapForm.Group controlId="formNumberOfApi">
                <BootstrapForm.Label>Number of APIs</BootstrapForm.Label>
                <BootstrapForm.Control
                  type="number"
                  placeholder="Enter number of APIs"
                  name="numberofapi"
                  value={formData.numberofapi}
                  onChange={handleInputChange}
                  required
                />
              </BootstrapForm.Group>
            </Col>
            <Col sm={6}>
              <BootstrapForm.Group controlId="formSuccessfulApiResponse">
                <BootstrapForm.Label>
                  Number of Successful API Responses
                </BootstrapForm.Label>
                <BootstrapForm.Control
                  type="number"
                  placeholder="Enter number of successful API responses"
                  name="numberofsuccessfulapiResponse"
                  value={formData.numberofsuccessfulapiResponse}
                  onChange={handleInputChange}
                  required
                />
              </BootstrapForm.Group>
            </Col>
          </Row> */}

          <Row className="mt-3">
            <Col sm={6}>
              <BootstrapForm.Group controlId="formCredit">
                <BootstrapForm.Label>Credit</BootstrapForm.Label>
                <BootstrapForm.Control
                  type="number"
                  placeholder="Enter credit"
                  name="credit"
                  value={formData.credit}
                  onChange={handleInputChange}
                  required
                />
              </BootstrapForm.Group>
            </Col>
            <Col sm={6}>
              <BootstrapForm.Group controlId="formPricing">
                <BootstrapForm.Label>Pricing</BootstrapForm.Label>
                <BootstrapForm.Control
                  type="number"
                  placeholder="Enter pricing"
                  name="pricing"
                  value={formData.pricing}
                  onChange={handleInputChange}
                  required
                />
              </BootstrapForm.Group>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col sm={6}>
              <BootstrapForm.Group controlId="formIndexOfPlan">
                <BootstrapForm.Label>Index of Plan</BootstrapForm.Label>
                <BootstrapForm.Control
                  type="number"
                  placeholder="Enter index of the plan"
                  name="indexofplan"
                  value={formData.indexofplan}
                  onChange={handleInputChange}
                  required
                />
              </BootstrapForm.Group>
            </Col>
          </Row>
          <BootstrapForm.Group controlId="formPlanStatus">
            <BootstrapForm.Label>Plan Status</BootstrapForm.Label>
            <BootstrapForm.Select
              name="planstatus"
              value={formData.planstatus}
              onChange={handleInputChange}
              required
            >
              <option disabled value="">
                Select Plan Status
              </option>
              <option value="UNPUBLISHED">UnPublished</option>
              <option value="PUBLISHED">Published</option>
            </BootstrapForm.Select>
          </BootstrapForm.Group>
          <BootstrapForm.Group className="mt-3" controlId="formCategoryId">
            <BootstrapForm.Label>Api Group</BootstrapForm.Label>

            <BootstrapForm.Select
              name="apigroupId"
              value={formData.apigroupId}
              onChange={handleInputChange}
              isInvalid={formError && !formData.apigroupId}
              required
            >
              <option disabled value="">
                Select a Api Group
              </option>
              {Array.isArray(apiGroupData) ? (
                apiGroupData.map((group) => (
                  <option key={group._id} value={group._id}>
                    {group.name}
                  </option>
                ))
              ) : (
                <option disabled>No products available</option>
              )}
            </BootstrapForm.Select>
          </BootstrapForm.Group>

          {renderSelect(
            "Pre-Validations",
            validationOptions,
            formData?.preValidation,

            "preValidation"
          )}
          {renderSelect(
            "Post-Validations",
            postValidationOptions,
            formData?.postValidation,
            "postValidation"
          )}

          {apiList.length > 0 && (
            <div className="mt-3">
              <h5>Associated APIs</h5>
              <Table striped bordered>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Pricing</th>
                    <th>Fields</th>
                    <th>Discounted Pricing</th>
                    <th>Discounted Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {apiList.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.pricing}</td>
                      <td>{item.fields.join(", ")}</td>
                      <td>
                        <BootstrapForm.Check
                          type="switch"
                          checked={item.discountedPricing}
                          onChange={(e) =>
                            handleSwitchChange(index, e.target.checked)
                          }
                        />
                      </td>
                      <td>
                        <BootstrapForm.Control
                          type="number"
                          value={item.discountedPrice}
                          onChange={(e) =>
                            setApiList((prevApiList) =>
                              prevApiList.map((api, i) =>
                                i === index
                                  ? { ...api, discountedPrice: e.target.value }
                                  : api
                              )
                            )
                          }
                          disabled={!item.discountedPricing}
                        />
                      </td>
                      <td>
                        <Button
                          onClick={() => handleRowSubmit(index)}
                          variant="primary"
                        >
                          Update
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}

          <Button type="submit" className="mt-4">
            {id ? "Update Plan" : "Create Plan"}
          </Button>
        </BootstrapForm>
      </div>
    </div>
  );
}

export default PlanForm;
