import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './categories.css'

function VegetablesPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  const vegetables = [
    { id: 4, name: "Potato", price: 5 },
    { id: 5, name: "Onion", price: 3 },
    { id: 6, name: "Brinjal", price: 4 },
  ];

  const updateCart = (vegetable, action) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === vegetable.id);

      if (action === "add") {
        if (existingItem) {
          return prevCart.map((item) =>
            item.id === vegetable.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          return [...prevCart, { ...vegetable, quantity: 1 }];
        }
      }

      if (action === "remove") {
        return prevCart.filter((item) => item.id !== vegetable.id);
      }

      return prevCart;
    });
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handlePayment = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/orders", {
        total_amount: total,
        total_items: totalItems,
      });

      console.log("Order saved:", response.data);
      navigate("/paymentpage"); // Navigate to the payment page
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Failed to process payment.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Available Vegetables</h2>
      {vegetables.map((veg) => (
        <div key={veg.id} style={{ marginBottom: "10px" }}>
          <h4>
            {veg.name} - ${veg.price}
          </h4>
          <button onClick={() => updateCart(veg, "add")}>Add to Cart</button>
        </div>
      ))}

      {cart.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <h3>Your Cart</h3>
          {cart.map((item) => (
            <div key={item.id} style={{ marginBottom: "10px" }}>
              {item.name} x {item.quantity} — $
              {item.price * item.quantity}
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

export default VegetablesPage;
