import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FruitsPage = () => {
  const navigate = useNavigate();

  // Navigation to payment page
  const goToPaymentPage = () => {
    navigate('/PaymentPage');
  };

  const [cart, setCart] = useState([]);

  // Seed data for fruits
  const fruits = [
    { id: 4, name: "Apple", price: 5 },
    { id: 5, name: "Banana", price: 3 },
    { id: 6, name: "Pomegranate", price: 4 },
  ];

  // Add to cart or update quantity
  const updateCart = (fruit, action) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === fruit.id);

      if (action === "add") {
        if (existingItem) {
          return prevCart.map((item) =>
            item.id === fruit.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          return [...prevCart, { ...fruit, quantity: 1 }];
        }
      }

      if (action === "remove") {
        return prevCart.filter((item) => item.id !== fruit.id);
      }

      return prevCart;
    });
  };

  // Calculate total amount and items in the cart
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Handle payment and order submission
  const handlePayment = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/orders", {
        total_amount: total,
        total_items: totalItems,
      });
      console.log("Order saved:", response.data);
      goToPaymentPage(); // Navigate to payment page
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Failed to process payment.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Available Fruits</h2>
      {fruits.map((fruit) => (
        <div key={fruit.id} style={{ marginBottom: "10px" }}>
          <h4>{fruit.name} - ${fruit.price}</h4>
          <button onClick={() => updateCart(fruit, "add")}>Add to Cart</button>
        </div>
      ))}

      {cart.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <h3>Your Cart</h3>
          {cart.map((item) => (
            <div key={item.id} style={{ marginBottom: "8px" }}>
              {item.name} x {item.quantity} — ${item.price * item.quantity}
              <button
                style={{ marginLeft: "10px" }}
                onClick={() => updateCart(item, "remove")}
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
};

export default FruitsPage;
