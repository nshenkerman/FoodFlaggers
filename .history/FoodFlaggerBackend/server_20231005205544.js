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
        const results = await pool.query('SELECT * FROM Event ORDER BY (num_upvotes - num_downvotes) DESC');
        res.json(results.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//API endpoint to post an event
app.post('/api/events', async (req, res) => {
    try {
        // extract data from the request body
        const { event_id, host_uid, title, description, start_time, end_time, food_type, price_type } = req.body;

       
        // insert the new event into the database
        const results = await pool.query('INSERT INTO Event VALUES (event_id, host_uid, title, description, start_time, end_time, food_type, price_type, 0, 0)', [event_id, host_uid, title, description, start_time, end_time, food_type, price_type]);

        // respond with the newly created event
        res.json(results.rows[0]);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});

