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
        const results = await pool.query('SELECT * FROM Event ORDER BY (num_upvotes-num_downvotes) DESC;');
        res.json(results.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


req = {
    method: 'POST',
    url: '/api/post_event',
    headers: {
      'host': 'yourapi.com',
      'content-type': 'application/json',
      // ... other headers ...
    },
    body: {
        event_id: "189734",
        host_uid: "23",
        title: "Club meeting 40", 
        description: "More free food", 
        start_time: null, end_time: null, 
        food_type: "vegetarian", 
        price_type: "free", 
        num_upvotes: "0", 
        num_downvotes:"0"
    },
    // ... many other properties and methods ...
  }
  
//API endpoint to post an event
app.post('/api/post_event', async (req, res) => {
    try {
        // extract data from the request body
        const { event_id, host_uid, title, description, start_time, end_time, food_type, price_type, num_upvotes, num_downvotes} = req.body;

       
        // insert the new event into the database
        const results = await pool.query('INSERT INTO Event (event_id, host_uid, title, description, start_time, end_time, food_type, price_type, num_upvotes, num_downvotes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [event_id, host_uid, title, description, start_time, end_time, food_type, price_type, num_upvotes, num_downvotes]);

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

