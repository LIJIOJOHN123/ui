import React, { useState } from "react";


const RazorpayPaymentButton = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    try {
      // Call your backend to get order ID
      const res = await fetch("http://localhost:5000/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: 500 }), // Amount in paise
      });

      if (!res.ok) {
        throw new Error("Failed to create order");
      }

      const data = await res.json();

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY, // Razorpay API Key from environment variables
        amount: data.amount, // Amount in paise
        currency: "INR",
        name: "Your Company",
        description: "Payment for product",
        order_id: data.orderId, // From backend
        handler: function (response) {
          // Handle the payment response here (e.g., send the payment details to your backend)
          console.log(response);
          // Optionally, send the response to your backend for verification
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
