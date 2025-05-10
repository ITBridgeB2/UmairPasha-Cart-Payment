import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Seedspage() {
  const navigate = useNavigate();
  const goToPayment = () => {
    navigate("/PaymentPage");
  };

  const [cart, setCart] = useState([]);

  // Seed data
  const seeds = [
    { id: 1, name: "Watermelon Seeds", price: 5 },
    { id: 2, name: "Tomato Seeds", price: 3 },
    { id: 3, name: "Carrot Seeds", price: 4 },
  ];

  // Add to cart or update quantity
  const updateCart = (seed, action) => {
    setCart((prev) => {
      const existingSeed = prev.find((item) => item.id === seed.id);

      if (action === "add") {
        if (existingSeed) {
          return prev.map((item) =>
            item.id === seed.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          return [...prev, { ...seed, quantity: 1 }];
        }
      }

      return prev.filter((item) => item.id !== seed.id); // Remove seed
    });
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handlePayment = async () => {
    try {
      // Send data to backend for storage
      const response = await axios.post("http://localhost:5000/api/orders", {
        total_amount: total,
        total_items: totalItems,
      });
      console.log("Order saved:", response.data);
      goToPayment(); // Navigate to PaymentPage
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Failed to process payment.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Available Seeds</h2>
      {seeds.map((seed) => (
        <div key={seed.id}>
          <h4>{seed.name} - ${seed.price}</h4>
          <button onClick={() => updateCart(seed, "add")}>Add to Cart</button>
        </div>
      ))}

      {cart.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <h3>Your Cart</h3>
          {cart.map((item) => (
            <div key={item.id} style={{ marginBottom: "10px" }}>
              {item.name} x {item.quantity} - ${item.price * item.quantity}
              <button
                onClick={() => updateCart(item, "remove")}
                style={{ marginLeft: "10px" }}
              >
                Remove
              </button>
            </div>
          ))}
          <h4>Total: ${total}</h4>
          <br />
          <button
            onClick={handlePayment}
            style={{
              border: "2px solid black",
              borderRadius: "30px",
              width: "100px",
              height: "50px",
              backgroundColor: "lightgreen",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Confirm Payment
          </button>
        </div>
      )}
    </div>
  );
}

export default Seedspage;
