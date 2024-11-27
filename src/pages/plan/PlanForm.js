import React, { useEffect, useState } from "react";
import { Form as BootstrapForm, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { categoryAction } from "../../store/categorySlice";
import {
  addplanAction,
  getByIdAPIAction,
  getplanApiListAPIAction,
  resetApiListDetails,
  updateplanAction,
} from "../../store/planSlice";

function PlanForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [planFormData, setPlanFormData] = useState({
    name: "",
    des: "",
    categoryId: "",
    apiId: [],
  });

  const [formData, setFormData] = useState([]);
  const [formError, setFormError] = useState(false);

  const { data: categories } = useSelector((state) => state.category);
  const { dataById: existingPlan, apiListDetails: dataById } = useSelector(
    (state) => state.plan
  );
  console.log(existingPlan, "existingPlan>>>>>>>>>");
  useEffect(() => {
    dispatch(resetApiListDetails());
    dispatch(categoryAction());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      dispatch(getByIdAPIAction(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (id && existingPlan) {
      setPlanFormData(existingPlan);
    }
  }, [id, existingPlan]);

  useEffect(() => {
    if (planFormData.categoryId) {
      dispatch(getplanApiListAPIAction(planFormData.categoryId));
    }
  }, [planFormData.categoryId, dispatch]);
  console.log(dataById, "dataById");
  useEffect(() => {
    if (dataById.length) {
      setFormData(
        dataById.map((item) => {
          // Check if existingPlan is available
          const updatedItem = {
            apiId: item._id,
            pricing: item.pricing,
            fields: item.fields,
            discoutedPricing: item.discoutedPricing || false,
            discoutedPrice: item.discoutedPrice || "",
          };

          if (existingPlan.apiId && id) {
            const existingApi = existingPlan.apiId.find(
              (existing) => existing.apiId === item._id
            );
            if (existingApi) {
              updatedItem.discoutedPricing =
                Boolean(existingApi.discoutedPrice) || false;
              updatedItem.discoutedPrice = existingApi.discoutedPrice || "";
            }
          }

          return updatedItem;
        })
      );
    }
  }, [dataById, existingPlan]);

  useEffect(() => {
    dispatch(resetApiListDetails());
  }, [dispatch]);

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

  const handlePlanInputChange = (e) => {
    const { name, value } = e.target;
    setPlanFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const requiredFields = ["name", "categoryId"];
    const isValid = requiredFields.every((field) => planFormData[field]);
    setFormError(!isValid);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (id) {
      dispatch(updateplanAction(id, planFormData));
    } else {
      dispatch(addplanAction(planFormData));
    }

    navigate(-1);
  };

  const handleRowSubmit = (e, index) => {
    e.preventDefault();
    const item = formData[index];

    setPlanFormData((prevData) => {
      const updatedApiData = [...prevData.apiId];
      if (!item.discoutedPricing) {
        const apiIndex = updatedApiData.findIndex(
          (data) => data.apiId === item.apiId
        );
        if (apiIndex !== -1) updatedApiData.splice(apiIndex, 1);
        item.discoutedPrice = "";
      } else {
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
            discoutedPrice: item.discoutedPrice,
            categoryId: planFormData.categoryId,
          });
        }
      }

      return { ...prevData, apiId: updatedApiData };
    });
  };

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
      <div className="d-flex justify-content-between">
        <h4>Create Plan</h4>
        <Button onClick={() => navigate(-1)} className="fw-bold">
          Back
        </Button>
      </div>

      <div className="mt-4 bg-body-secondary rounded-2 p-3">
        <BootstrapForm onSubmit={handleSubmit}>
          <BootstrapForm.Group controlId="formApiName">
            <BootstrapForm.Label className="m-0">Plan Name</BootstrapForm.Label>
            <BootstrapForm.Control
              type="text"
              placeholder="Enter plan name"
              name="name"
              value={planFormData.name}
              onChange={handlePlanInputChange}
              required
            />
          </BootstrapForm.Group>

          <BootstrapForm.Group className="mt-3" controlId="formApiDescription">
            <BootstrapForm.Label className="m-0">
              Plan Description
            </BootstrapForm.Label>
            <BootstrapForm.Control
              as="textarea"
              rows={3}
              placeholder="Enter plan description"
              name="des"
              value={planFormData.des}
              onChange={handlePlanInputChange}
            />
          </BootstrapForm.Group>

          <BootstrapForm.Group className="mt-3" controlId="formCategoryId">
            <BootstrapForm.Label className="m-0">Category</BootstrapForm.Label>
            <BootstrapForm.Select
              name="categoryId"
              value={planFormData.categoryId}
              onChange={handlePlanInputChange}
              required
            >
              <option value="">Select a category</option>
              {categories?.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.category_name}
                </option>
              ))}
            </BootstrapForm.Select>
          </BootstrapForm.Group>

          {formError && (
            <div className="text-danger mt-2">
              Please fill all the required fields.
            </div>
          )}

          {formData?.length > 0 && (
            <div className="mt-3">
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
                  {formData.map((item, index) => (
                    <tr key={item.apiId}>
                      <td>
                        <i
                          className="bi bi-eye-fill"
                          onClick={() => navigate(`/client/${item.apiId}`)}
                        ></i>
                      </td>
                      <td>{item.apiId}</td>
                      <td>{item.pricing || "N/A"}</td>
                      <td>
                        {Array.isArray(item.fields)
                          ? item.fields.join(", ")
                          : "No fields"}
                      </td>
                      <td>
                        <BootstrapForm.Group>
                          <BootstrapForm.Check
                            type="switch"
                            name="discoutedPricing"
                            checked={item.discoutedPricing}
                            onChange={(e) => handleSwitchChange(e, index)}
                          />
                        </BootstrapForm.Group>
                      </td>
                      <td>
                        <BootstrapForm.Group>
                          <BootstrapForm.Control
                            disabled={!item.discoutedPricing}
                            type="number"
                            name="discoutedPrice"
                            value={item.discoutedPrice}
                            onChange={(e) => handleInputChange(e, index)}
                            className="form-control-sm"
                          />
                        </BootstrapForm.Group>
                      </td>
                      <td>
                        <Button
                          variant="primary"
                          onClick={(e) => handleRowSubmit(e, index)}
                        >
                          {item.discoutedPricing ? "Update" : "Add"}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
