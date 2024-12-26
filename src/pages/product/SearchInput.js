import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputGroup, Button, Form, Modal } from "react-bootstrap";
import { useEffect } from "react";
import { clientManagementListAction } from "../../store/clientManagementSlice";

function ProductSearchPopup({ setSearchQueries }) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [tempSearchQueries, setTempSearchQueries] = useState({
    name: "",
    description: "",
    clientId: "",
  });

  useEffect(() => {
    dispatch(clientManagementListAction());
  }, []);

  const clientData = useSelector((state) => state.clientManagement.data);

  const handleClose = () => {
    setShow(false);
    setTempSearchQueries({
      name: "",
      description: "",
      clientId: "",
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
    handleClose();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <i className="bi bi-search me-2"></i> Search
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Search Product Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Product Name Input */}
            <InputGroup className="mb-3">
              <InputGroup.Text>Product Name</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Enter Product Name"
                value={tempSearchQueries.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </InputGroup>

            {/* Description Input */}
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

            {/* Client Dropdown */}
            <Form.Group controlId="formClient">
              <Form.Label>Add Client</Form.Label>
              <Form.Control
                as="select"
                value={tempSearchQueries.clientId}
                onChange={(e) => handleInputChange("clientId", e.target.value)}
              >
                <option value="">Select Client</option>
                {clientData.map((client) => (
                  <option key={client.clientId._id} value={client.clientId._id}>
                    {client.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
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

export default ProductSearchPopup;
