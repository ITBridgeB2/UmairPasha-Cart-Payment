import React from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();
    const goback = ()=>{
        navigate('/categorypage')
    }
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0fdf4",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const cardStyle = {
    textAlign: "center",
    background: "#ffffff",
    padding: "40px 30px",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
  };

  const titleStyle = {
    fontSize: "2rem",
    color: "#2e7d32",
    marginBottom: "15px",
  };

  const textStyle = {
    fontSize: "1.1rem",
    color: "#444",
    marginBottom: "30px",
  };

  const buttonStyle = {
    padding: "12px 24px",
    fontSize: "1rem",
    color: "white",
    backgroundColor: "#4caf50",
    border: "none", 
    borderRadius: "25px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>🎉 Payment Successful!</h1>
        <p style={textStyle}>
          Thank you for your purchase. Your order has been placed successfully.
        </p>
        <button
          style={buttonStyle}
          onClick={goback}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#388e3c")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#4caf50")}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
