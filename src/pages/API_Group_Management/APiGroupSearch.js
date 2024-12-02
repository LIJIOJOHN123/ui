import { useState } from "react";
import { InputGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function APiGroupSearch({ setSearchQueries }) {
  const [show, setShow] = useState(false);


  const [tempSearchQueries, setTempSearchQueries] = useState({
    name: "",
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
          <Modal.Title>Search Group Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Explicit Inputs */}
            <InputGroup className="mb-3">
              <InputGroup.Text>Group Name</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Enter API Group Name"
                value={tempSearchQueries.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
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

export default APiGroupSearch;
