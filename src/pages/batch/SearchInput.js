import { useState } from "react";
import { InputGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function BatchSearch({ setSearchQueries }) {
  const [show, setShow] = useState(false);

  const [tempSearchQueries, setTempSearchQueries] = useState({
    type: "",
    name: "",
    description: "",
  });

  const handleClose = () => {
    setShow(false);
    setTempSearchQueries({
      type: "",
      name: "",
      description: "",
    });
  };

  const handleShow = () => setShow(true);

  const handleInputChange = (key, value) => {
    setTempSearchQueries((prev) => ({
      ...prev,
      [key]: value,
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
          <Modal.Title>Search Group Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Type Select Dropdown */}
            <InputGroup className="mb-3">
              <InputGroup.Text>Type</InputGroup.Text>
              <Form.Select
                value={tempSearchQueries.type}
                onChange={(e) => handleInputChange("type", e.target.value)}
              >
                <option disabled value="">
                  Select Type
                </option>
                <option value="FORM">Form</option>
                <option value="CSV">CSV</option>
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

export default BatchSearch;
