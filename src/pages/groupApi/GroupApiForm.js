import React, { useEffect, useState } from "react";
import { Form as BootstrapForm, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import { apiListAction } from "../../store/apiSlice";
import {
  addAPIGroupAction,
  getByIdAPIAction,
  updateAPIGroupAction
} from "../../store/groupSlice";

function GroupApiForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [selectedValues, setSelectedValues] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    des: "",
    apiId: [],
  });
  const [error, setError] = useState(false);
  const { loading, status, dataById } = useSelector((state) => state.groupApi);
  const { data: apiData } = useSelector((state) => state.apiList);

  useEffect(() => {
    if (id) {
      dispatch(getByIdAPIAction(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (id && dataById) {
      setFormData({
        name: dataById.name,
        des: dataById.des,
        apiId: [dataById?.apiList?.map((item) => item.apiId._id)],
      });
      // Check if apiList exists and is an array before mapping
      if (dataById.apiList && Array.isArray(dataById.apiList)) {
        const selectedOptions = dataById.apiList?.map((item) => ({
          value: item.apiId._id,
          label: item.apiId.apiname,
        }));
        setSelectedValues(selectedOptions);
      }
    }
  }, [id, dataById]);

  useEffect(() => {
    if (!apiData.length && !loading) {
      dispatch(apiListAction());
    }
  }, [apiData, loading, dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSelectChange = (selected) => {
    const newSelectedValues = selected ?? [];
    setSelectedValues(newSelectedValues);

    const selectedIds = newSelectedValues.map((item) => item.value);
    setFormData((prevData) => ({
      ...prevData,
      apiId: selectedIds,
    }));

    setError(selectedIds.length === 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      dispatch(updateAPIGroupAction(id, formData));
      dispatch(getByIdAPIAction(id));
    } else {
      dispatch(addAPIGroupAction(formData));
    }

    if (status === "ok") {
      navigate("/api-group");
    }
  };

  const options = apiData.map((item) => ({
    value: item._id,
    label: item.apiname,
  }));

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h4>{id ? "Edit Group" : "Create Group"}</h4>
        <Button onClick={() => navigate("/api-group")} className="fw-bold">
          Back
        </Button>
      </div>
      <div className="mt-4 bg-body-secondary rounded-2 p-3">
        <BootstrapForm onSubmit={handleSubmit}>
          <BootstrapForm.Group controlId="formApiName">
            <BootstrapForm.Label className="m-0">
              Group Name
            </BootstrapForm.Label>
            <BootstrapForm.Control
              type="text"
              placeholder="Enter group name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </BootstrapForm.Group>

          <BootstrapForm.Group className="mt-3" controlId="formApiDescription">
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

          <BootstrapForm.Group className="mt-3" controlId="formApiSelect">
            <BootstrapForm.Label className="m-0">
              Select API
            </BootstrapForm.Label>
            <Select
              isMulti
              options={options}
              onChange={handleSelectChange}
              placeholder="Select APIs..."
              value={selectedValues} // Use the selected values from state
            />
          </BootstrapForm.Group>
          {error && error}
          <Button variant="primary" type="submit" className="mt-4">
            {loading ? <div className="spinner-border" /> : <div>Submit</div>}
          </Button>
        </BootstrapForm>
      </div>
    </div>
  );
}

export default GroupApiForm;
