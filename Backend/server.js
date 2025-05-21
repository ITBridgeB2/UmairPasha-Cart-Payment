const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware to handle CORS and parse JSON data in request bodies
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection Setup
const db = mysql.createConnection({
  host: 'localhost',       // MySQL host
  user: 'root',            // MySQL user (replace with your user)
  password: 'root',        // MySQL password (replace with your password)
  database: 'carts'        // MySQL database name
});

// Connect to MySQL database
db.connect((err) => {
  if (err) {
    console.error('MySQL connection failed:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

// Route to create a new order
app.post('/api/orders', (req, res) => {
  const { total_amount, total_items } = req.body;

  // Check if required fields are present in the request body
  if (!total_amount || !total_items) {
    return res.status(400).json({ error: 'Missing total_amount or total_items' });
  }

  // Insert order into the database
  const sql = 'INSERT INTO orders (total_amount, total_items) VALUES (?, ?)';
  db.query(sql, [total_amount, total_items], (err, result) => {
    if (err) {
      console.error('Error inserting order:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ message: 'Order saved successfully', orderId: result.insertId });
  });
});

// Route to fetch all orders
app.get('/api/orders', (req, res) => {
  const query = 'SELECT * FROM orders ORDER BY order_time DESC';  // Fetch orders ordered by time
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching orders:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);  // Send all orders as the response
  });
});

// Route to fetch a single order by ID
// Route to get the most recent order
app.get('/api/orders/latest', (req, res) => {
  const query = 'SELECT * FROM orders ORDER BY order_time DESC LIMIT 1'; // Get the most recent order
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error fetching latest order:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'No orders found' });
    }

    // Assuming that the order has a related "items" table or some reference
    const order = result[0];
    // You can add logic to fetch related items if necessary, here we're just returning the order itself
    res.json(order);
  });
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
