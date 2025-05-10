import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  // Handle login navigation
  const handleLoginClick = () => {
    navigate('/loginpage');
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.header}>E-farming</h1>
        <p style={styles.subheader}>Welcome to the future of farming!</p>

        {/* Main Image */}
        <div style={styles.imageContainer}>
          <img
            src="Homepage.jpg"
            alt="Homepage"
            style={styles.image}
          />
        </div>

        {/* Login Button */}
        <button onClick={handleLoginClick} style={styles.button}>
          Go to Login
        </button>

        {/* Second Image */}
        <div style={styles.imageContainer}>
          <img
            src="hompage2.jpg"
            alt="Homepage 2"
            style={styles.image}
          />
        </div>
      </div>
    </div>
  );
}

// Simplified styles object
const styles = {
  container: {
    backgroundColor: '#dff0d8',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    textAlign: 'center',
    paddingTop: '50px',
  },
  header: {
    fontSize: '3rem',
    color: '#388E3C',
  },
  subheader: {
    fontSize: '1.2rem',
    color: '#333',
  },
  imageContainer: {
    marginBottom: '20px',
  },
  image: {
    width: '80%',
    maxWidth: '400px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  button: {
    padding: '12px 30px',
    fontSize: '1.2rem',
    borderRadius: '30px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default HomePage;
