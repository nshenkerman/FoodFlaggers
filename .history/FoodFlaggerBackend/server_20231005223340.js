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
  }


//update preferences API 
app.post('/api/update_preferences', async (req, res) => {
    console.log("POST /api/update_preferences accessed");
    
    try {
        // Extract the values from the request body
        const { uid, food_preference, price_preference } = req.body;

        // Update the Preferences table for the specified uid in the database
        const results = await pool.query('UPDATE Preferences SET food_preference = $1, price_preference = $2 WHERE uid = $3 RETURNING *', [food_preference, price_preference, uid]);

        // Check if any row was updated
        if (results.rowCount === 0) {
            return res.status(404).json({ error: 'User preferences not found for the given UID' });
        }

        // Respond with the updated preferences
        res.json(results.rows[0]);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


//API endpoint to post an event
app.post('/api/post_event', async (req, res) => {
    console.log("POST /api/post_event accessed");
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

app.post('/api/upvote_event', async (req, res) => {
    console.log("POST /api/upvote_event accessed");
    
    try {
        // Extract event_id from the request body
        const { event_id } = req.body;

        // Update num_upvotes for the specified event_id in the database
        const results = await pool.query('UPDATE Event SET num_upvotes = num_upvotes+1 WHERE event_id = $1 RETURNING *', [event_id]);

        // Check if any row was updated
        if (results.rowCount === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }

        // Respond with the updated event
        res.json(results.rows[0]);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/downvote_event', async (req, res) => {
    console.log("POST /api/downvote_event accessed");
    
    try {
        // Extract event_id from the request body
        const { event_id } = req.body;

        // Update num_upvotes for the specified event_id in the database
        const results = await pool.query('UPDATE Event SET num_downvotes = num_downvotes-1 WHERE event_id = $1 RETURNING *', [event_id]);

        // Check if any row was updated
        if (results.rowCount === 0) {
            return res.status(404).json({ error: 'Event not found' });
        }

        // Respond with the updated event
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

