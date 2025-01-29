import { useState } from "react";
import { InputGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function SearchPopup({ setSearchQueries }) {
  const [show, setShow] = useState(false);

  // Initialize tempSearchQueries with predefined keys
  const [tempSearchQueries, setTempSearchQueries] = useState({
    batchId: "",
    job_id: "",
    clientReportSendToUrlStatus: "",
    clientReportSendToEmailStatus: "",
  });

  const handleClose = () => {
    setShow(false);
    setTempSearchQueries({
      batchId: "",
    job_id: "",
    clientReportSendToUrlStatus: "",
    clientReportSendToEmailStatus: "",
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
    setSearchQueries(tempSearchQueries);
    setShow(false);
  };

  return (
    <>
       <Button variant="primary" onClick={handleShow}>
        <i className="bi bi-search me-2"></i> Search
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Search Api Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Explicit Inputs */}
            <InputGroup className="mb-3">
              <InputGroup.Text>Batch id</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Batch id"
                value={tempSearchQueries.batchId}
                onChange={(e) => handleInputChange("batchId", e.target.value)}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Job Id</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Job id"
                value={tempSearchQueries.job_id}
                onChange={(e) => handleInputChange("job_id", e.target.value)}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text>Callback status</InputGroup.Text>
              <Form.Control
                as="select"
                value={tempSearchQueries.clientReportSendToUrlStatus}
                onChange={(e) => handleInputChange("clientReportSendToUrlStatus", e.target.value)}
              >
                <option value="">Select API Type</option>
                <option value="PENDING">PENDING</option>
                <option value="IN PROGRESS">IN PROGRESS</option>
                <option value="SKIPPED">SKIPPED</option>
                <option value="COMPLETED">COMPLETED</option>
              </Form.Control>
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Email status</InputGroup.Text>
              <Form.Control
                as="select"
                value={tempSearchQueries.clientReportSendToEmailStatus}
                onChange={(e) => handleInputChange("clientReportSendToEmailStatus", e.target.value)}
              >
                <option value="">Select API Type</option>
                <option value="PENDING">PENDING</option>
                <option value="IN PROGRESS">IN PROGRESS</option>
                <option value="SKIPPED">SKIPPED</option>
                <option value="COMPLETED">COMPLETED</option>
              </Form.Control>
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

export default SearchPopup;
