import { useState } from 'react';
import { InputGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function FundForm() {
  const [formData,setFormData] = useState({
    amount:0,
    type:"",
    decription:"",
  })
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleChange = ()=>{
    
  }
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Price
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add/Deduct amount</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <InputGroup className="mb-3">
              <Form.Control
                type="number"
                placeholder="Amount to add / deduct"
                className="py-3 border-1 border-black"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </InputGroup>
            <InputGroup className="mb-3">
            <select className="form-select form-select-sm" aria-label=".form-select-sm example">
              <option selected>Open this select menu</option>
              <option value="DEBIT">DEBIT</option>
              <option value="CREDT">CREDIT</option>
            </select>
            </InputGroup>
            <InputGroup className="mb-3">
              <Form.Control
                type="text"
                placeholder="Description"
                className="py-3 border-1 border-black"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </InputGroup>
          </Form>
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FundForm;