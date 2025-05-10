import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Handle category page navigation
  const handleCategory = () => {
    navigate('/categorypage');
  };

  // Handle cancellation (navigate back to HomePage)
  const handleCancel = () => {
    navigate('/HomePage');
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    // Add logic for form validation, authentication here
    if (username && password) {
      handleCategory(); // Navigate to the category page after successful login
    } else {
      alert('Please fill in both username and password');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <form onSubmit={handleSubmit} style={{
        textAlign: 'center',
        border: '2px solid #ddd',
        borderRadius: '20px',
        backgroundColor: '#f7f7f7',
        height: 'auto',
        width: '300px',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}>
        <h2 style={{ marginBottom: '20px', fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>Login</h2>

        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="username" style={{ display: 'block', textAlign: 'left' }}>Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '10px',
              border: '1px solid #ccc',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div style={{ marginBottom: '25px' }}>
          <label htmlFor="password" style={{ display: 'block', textAlign: 'left' }}>Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '10px',
              border: '1px solid #ccc',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <div>
          <button
            type="button"
            onClick={handleCancel}
            style={{
              height: '40px',
              width: '100px',
              borderRadius: '10px',
              marginRight: '20px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              transition: '0.3s',
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#d32f2f'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#f44336'}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{
              height: '40px',
              width: '100px',
              borderRadius: '10px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              transition: '0.3s',
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#388E3C'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
