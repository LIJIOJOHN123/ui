import { useState } from "react";
import { InputGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function ClientSearchPopup({ setSearchQueries }) {
  const [show, setShow] = useState(false);

  // Initialize tempSearchQueries with predefined keys
  const [tempSearchQueries, setTempSearchQueries] = useState({
    name: "",
    email: "",
    role: "",
    status: "",
  });

  const handleClose = () => {
    setShow(false);
    setTempSearchQueries({
      name: "",
      email: "",
      role: "",
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
          <Modal.Title>Search Client Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Name Input */}
            <InputGroup className="mb-3">
              <InputGroup.Text>Name</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                value={tempSearchQueries.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </InputGroup>

            {/* Email Input */}
            <InputGroup className="mb-3">
              <InputGroup.Text>Email</InputGroup.Text>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={tempSearchQueries.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </InputGroup>

            {/* Role Dropdown */}
            <InputGroup className="mb-3">
              <InputGroup.Text>Role</InputGroup.Text>
              <Form.Control
                as="select"
                value={tempSearchQueries.role}
                onChange={(e) => handleInputChange("role", e.target.value)}
              >
                <option value="">Select Role</option>
                <option value="ADMIN">ADMIN</option>
                <option value="USER">USER</option>
              </Form.Control>
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Status</InputGroup.Text>
              <Form.Control
                as="select"
                value={tempSearchQueries.status}
                onChange={(e) => handleInputChange("status", e.target.value)}
              >
                <option value="">Select Status</option>
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inctive</option>
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

export default ClientSearchPopup;
