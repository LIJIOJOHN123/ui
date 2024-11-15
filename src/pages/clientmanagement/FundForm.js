import { useState } from "react";
import { InputGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { updateClientAction } from "../../store/clientManagementSlice";
import { useDispatch, useSelector } from "react-redux";

function FundForm({ id }) {
  const [formData, setFormData] = useState({
    amount: 0,
    type: "",
  });
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const handleClose = () => {
    setShow(false);
    setError(""); // Clear errors on close
  };
  const data = useSelector((state) => state.clientManagement);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError(""); // Clear errors when the user changes input
  };

  const handleSave = () => {
    if (formData.amount > 0 && formData.type) {
      dispatch(updateClientAction(id, formData));
      setFormData({ amount: 0, type: "" });
      setShow(false);
    } else {
      setError("Please fill out all required fields.");
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Price
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add/Deduct Amount</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <InputGroup className="mb-3">
              <Form.Control
                type="number"
                placeholder="Amount to add / deduct"
                className="py-3 border-1 border-black"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
                min={0}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <Form.Select
                aria-label="Select transaction type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Open this select menu
                </option>
                <option value="DEBIT">DEBIT</option>
                <option value="CREDIT">CREDIT</option>
              </Form.Select>
            </InputGroup>
            {error && <p className="text-danger">{error}</p>}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FundForm;
