const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // To handle JSON payloads

// API endpoint to get all events
app.get('/api/events', async (req, res) => {
  try {
    const results = await db.query('SELECT * FROM Event');
    res.json(results.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
