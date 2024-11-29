import { useState } from "react";
import { InputGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function SearchPopup({ setSearchQueries }) {
  const [show, setShow] = useState(false);

  // Initialize tempSearchQueries with predefined keys
  const [tempSearchQueries, setTempSearchQueries] = useState({
    apiname: "",
    api_type: "",
    backend_api_key_name: "",
    description: "",
  });

  const handleClose = () => {
    setShow(false);
    setTempSearchQueries({
      apiname: "",
      api_type: "",
      backend_api_key_name: "",
      description: "",
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
              <InputGroup.Text>API Name</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Enter API Name"
                value={tempSearchQueries.apiname}
                onChange={(e) => handleInputChange("apiname", e.target.value)}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text>API Type</InputGroup.Text>
              <Form.Control
                as="select"
                value={tempSearchQueries.api_type}
                onChange={(e) => handleInputChange("api_type", e.target.value)}
              >
                <option value="">Select API Type</option>
                <option value="live">Live</option>
                <option value="demo">Demo</option>
                <option value="internal">Demo</option>
              </Form.Control>
            </InputGroup>

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

            <InputGroup className="mb-3">
              <InputGroup.Text>Description</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Enter Description"
                value={tempSearchQueries.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
              />
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
