const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const config = require('./config/config.json');

const env = process.env.NODE_ENV || 'development'; // Default to 'development' if NODE_ENV is not set

const dbConfig = config[env];
const pool = new Pool(dbConfig);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API endpoint to get all events
app.get('/api/events', async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM Event');
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
