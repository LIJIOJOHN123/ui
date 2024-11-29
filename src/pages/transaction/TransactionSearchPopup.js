import { useState } from "react";
import { InputGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function TransactionSearchPopup({ setSearchQueries }) {
  const [show, setShow] = useState(false);

  const [tempSearchQueries, setTempSearchQueries] = useState({
    type: "",
    amount: "",
    mode: "",
  });

  const handleClose = () => {
    setShow(false);
    setTempSearchQueries({
      type: "",
      amount: "",
      mode: "",
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
          <Modal.Title>Search Transactions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Type Dropdown */}
            <InputGroup className="mb-3">
              <InputGroup.Text>Type</InputGroup.Text>
              <Form.Control
                as="select"
                value={tempSearchQueries.type}
                onChange={(e) => handleInputChange("type", e.target.value)}
              >
                <option value="">Select Type</option>
                <option value="DEBIT">Debit</option>
                <option value="CREDIT">Credit</option>
              </Form.Control>
            </InputGroup>

            {/* Amount Input */}
            <InputGroup className="mb-3">
              <InputGroup.Text>Amount</InputGroup.Text>
              <Form.Control
                type="number"
                placeholder="Enter Amount"
                value={tempSearchQueries.amount}
                onChange={(e) => handleInputChange("amount", e.target.value)}
              />
            </InputGroup>

            {/* Mode Dropdown */}
            <InputGroup className="mb-3">
              <InputGroup.Text>Mode</InputGroup.Text>
              <Form.Control
                as="select"
                value={tempSearchQueries.mode}
                onChange={(e) => handleInputChange("mode", e.target.value)}
              >
                <option value="">Select Mode</option>
                <option value="ONLINE">ONLINE</option>
                <option value="CBZERO">CBZERO</option>
                {/* <option value="API USAGE">API USAGE</option> */}
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

export default TransactionSearchPopup;
