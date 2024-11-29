import React, { useEffect, useState } from "react";
import { Form as BootstrapForm, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { clientManagementListAction } from "../../store/clientManagementSlice";
import { addAPIGroupAction } from "../../store/productManagementSlice";

function GroupApiForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    clientId: "",
    name: "",
    des: "",
  });

  const { loading, status, dataById } = useSelector((state) => state.groupApi);
  const clientData = useSelector((state) => state.clientManagement.data);
  console.log(formData, status);
  // Fetch necessary data when the component loads
  useEffect(() => {
    // if (id) {
    //   dispatch(getByIdAPIAction(id));
    // }
    dispatch(clientManagementListAction());
  }, [id, dispatch]);

  // Populate form data when editing
  useEffect(() => {
    if (id && dataById) {
      setFormData({
        clientId: dataById.clientId || "",
        name: dataById.name || "",
        des: dataById.des || "",
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
    // if (id) {
    //   dispatch(updateAPIGroupAction(id, formData));
    // } else {
    dispatch(addAPIGroupAction(id, formData));
    // }

    if (status === "ok") {
      navigate("/category");
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h4>Create Group</h4>
        {/* <h4>{id ? "Edit Group" : "Create Group"}</h4> */}
        <Button onClick={() => navigate("/products")} className="fw-bold">
          Back
        </Button>
      </div>
      <div className="mt-4 bg-body-secondary rounded-2 p-3">
        <BootstrapForm onSubmit={handleSubmit}>
          {/* Add Client Dropdown */}
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
              <option value="">Select client</option>
              {clientData.map((client) => (
                <option key={client._id} value={client._id}>
                  {client.name}
                </option>
              ))}
            </BootstrapForm.Control>
          </BootstrapForm.Group>

          {/* Group Name */}
          <BootstrapForm.Group controlId="formGroupName" className="mt-3">
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

          {/* Group Description */}
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

          {/* Submit Button */}
          <Button variant="primary" type="submit" className="mt-4">
            {loading ? <div className="spinner-border" /> : "Submit"}
          </Button>
        </BootstrapForm>
      </div>
    </div>
  );
}

export default GroupApiForm;
