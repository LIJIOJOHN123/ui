import { useState } from "react";
import { InputGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function ApiResponseSearchPopup({ setSearchQueries }) {
  const [show, setShow] = useState(false);

  const [tempSearchQueries, setTempSearchQueries] = useState({
    job_id: "",
    backend_api_key_name: "",
    unique_id: "",
    apiStatus: "",
    batchId: "",
  });

  const handleClose = () => {
    setShow(false);
    setTempSearchQueries({
      job_id: "",
      backend_api_key_name: "",
      unique_id: "",
      apiStatus: "",
      batchId: "",
    });
  };

  const handleShow = () => setShow(true);

  const handleInputChange = (key, value) => {
    setTempSearchQueries((prev) => ({
      ...prev,
      [key]: value.trim(),
    }));
  };

  const handleSearchClick = () => {
    setSearchQueries((prev) => ({
      ...prev,
      ...tempSearchQueries,
    }));

    setShow(false);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <i className="bi bi-search me-2"></i> Search
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Search Validation Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Input for job_id */}
            <InputGroup className="mb-3">
              <InputGroup.Text>Job ID</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Enter Job ID"
                value={tempSearchQueries.job_id}
                onChange={(e) => handleInputChange("job_id", e.target.value)}
              />
            </InputGroup>

            {/* Input for backend_api_key_name */}
            <InputGroup className="mb-3">
              <InputGroup.Text>Backend API Key Name</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Enter Backend API Key Name"
                value={tempSearchQueries.backend_api_key_name}
                onChange={(e) =>
                  handleInputChange("backend_api_key_name", e.target.value)
                }
              />
            </InputGroup>

            {/* Input for unique_id */}
            <InputGroup className="mb-3">
              <InputGroup.Text>Unique ID</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Enter Unique ID"
                value={tempSearchQueries.unique_id}
                onChange={(e) => handleInputChange("unique_id", e.target.value)}
              />
            </InputGroup>

            {/* Input for batchId */}
            <InputGroup className="mb-3">
              <InputGroup.Text>BatchId ID</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Enter BatchId ID"
                value={tempSearchQueries.batchId}
                onChange={(e) => handleInputChange("batchId", e.target.value)}
              />
            </InputGroup>

            {/* Select input for apiStatus */}
            <InputGroup className="mb-3">
              <InputGroup.Text>API Status</InputGroup.Text>
              <Form.Select
                value={tempSearchQueries.apiStatus}
                onChange={(e) => handleInputChange("apiStatus", e.target.value)}
              >
                <option value="">Select API Status</option>
                <option value="PENDING FOR PREVALIDATION">
                  PENDING FOR PREVALIDATION
                </option>
                <option value="PREVALIDATION UNDER PROCESS">
                  PREVALIDATION UNDER PROCESS
                </option>
                <option value="PREVALIDATION SUCCESSFULL">
                  PREVALIDATION SUCCESSFULL
                </option>
                <option value="PREVALIDATION FAILED">
                  PREVALIDATION FAILED
                </option>
                <option value="TRIGGER API">TRIGGER API</option>
                <option value="API UNDER PROCESS">API UNDER PROCESS</option>
                <option value="API SUCCESSFUL">API SUCCESSFUL</option>
                <option value="API FAILED">API FAILED</option>
              </Form.Select>
            </InputGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleSearchClick}
            disabled={Object.values(tempSearchQueries).every((val) => !val)}
          >
            Search
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ApiResponseSearchPopup;
