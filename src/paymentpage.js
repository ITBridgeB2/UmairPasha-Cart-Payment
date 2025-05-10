import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './paymentpage.css';

const PaymentPage = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/orders/latest");
        setOrderDetails(response.data);
      } catch (err) {
        setError("Failed to load order details");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  const { items = [], total_amount = 0, total_items = 0 } = orderDetails || {};

  return (
    <div className="payment-page-container">
      <h2>Payment Details</h2>

      <div className="order-summary">
        <h3>Order Summary</h3>
        <p>Total Items: {total_items}</p>
        <p>Total Amount: ${total_amount}</p>
      </div>

      <button className="confirm-button" onClick={() => navigate("/successpage")}>
        Confirm Payment
      </button>
    </div>
  );
};

export default PaymentPage;
