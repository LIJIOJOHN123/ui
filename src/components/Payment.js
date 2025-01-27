import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { getLocalStorage, removeLocalStorage } from "../utils/LocalStorage";
import { getByIdPlanAction } from "../store/planSlice";
import { useDispatch, useSelector } from "react-redux";
import { addPaymentAction } from "../store/paymentSlice";
import { useNavigate } from "react-router-dom";

const PaymentModal = () => {
  const [showModal, setShowModal] = useState(false);
  const { dataById: plandataById } = useSelector((state) => state.plan);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const payment = getLocalStorage("payment");
    if (payment) {
      dispatch(getByIdPlanAction(payment));
      setShowModal(true);
    }
  }, [dispatch]);

  const handleModalClose = () => {
    removeLocalStorage("payment");
    setShowModal(false);
  };

  const handleNoPay = () => {
    removeLocalStorage("payment");
    setShowModal(false);
  };

  const handlePay = async () => {
    const data = {
      amount: plandataById.pricing,
      currency: "USD",
      receipt: `receipt_${new Date().getTime()}`,
      notes: { note1: "Payment for Test" },
    };

    try {
      await dispatch(addPaymentAction(plandataById._id, data, user));
      removeLocalStorage("payment");
      setShowModal(false);
      navigate('/client-batch', { replace: true });

    } catch (error) {
      console.error("Payment action failed:", error);
    }
  };

  return (
    <Modal show={showModal} onHide={handleModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Upgrade Plan</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Do you want to Buy a plan? Shall we proceed to payment?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleNoPay}>
          No
        </Button>
        <Button variant="success" onClick={handlePay}>
          Yes, Pay Now
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PaymentModal;
