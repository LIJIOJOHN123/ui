import React, { useState } from "react";


const RazorpayPaymentButton = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:5000/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 500 }), 
      });

      if (!res.ok) {
        throw new Error("Failed to create order");
      }

      const data = await res.json();

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY, 
        amount: data.amount, 
        currency: "INR",
        name: "Your Company",
        description: "Payment for product",
        order_id: data.orderId, 
        handler: function (response) {
          console.log(response);
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9876543210",
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (err) {
      setError("Error creating order. Please try again.");
      console.error("Error creating order", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      {loading && (
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )}
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      <button
        onClick={handlePayment}
        className="btn btn-primary mt-3"
        disabled={loading}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
};

export default RazorpayPaymentButton;
