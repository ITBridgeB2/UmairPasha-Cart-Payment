import React from "react";
import { useNavigate } from "react-router-dom";
import "./categorypage.css";

function Categorypage() {
  const navigate = useNavigate();

  const handleNavigation = (category) => {
    navigate(`/${category}`);
  };

  const handleLogout = () => {
    navigate("/"); // Redirect to home page
  };

  return (
    <div className="category-container">
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>

      <div className="category-item" onClick={() => handleNavigation("seedscategory")}>
        <img src="seeds.jpg" alt="Seeds" />
        <button>Seeds</button>
      </div>

      <div className="category-item" onClick={() => handleNavigation("fruitscategory")}>
        <img src="fruits.jpg" alt="Fruits" />
        <button>Fruits</button>
      </div>

      <div className="category-item" onClick={() => handleNavigation("vegetablescategory")}>
        <img src="vegetables.jpg" alt="Vegetables" />
        <button>Vegetables</button>
      </div>
    </div>
  );
}

export default Categorypage;
