const app = require('./server');
const db = require('./db');

// Example route to get data from the database
app.get('/api/data', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM Events');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});



// req = {
//     method: 'POST',
//     url: '/api/post_event',
//     headers: {
//       'host': 'yourapi.com',
//       'content-type': 'application/json',
//     },
//     body: {
//         event_id: "189734",
//         host_uid: "23",
//         title: "Club meeting 40", 
//         description: "More free food", 
//         start_time: null, end_time: null, 
//         food_type: "vegetarian", 
//         price_type: "free", 
//         num_upvotes: "0", 
//         num_downvotes:"0"
//     },
//   }


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

/*
TODO: check Viraj's implementation of the preferences API

app.post('/api/update_preferences', async (req, res) => {
  console.log("POST /api/update_preferences accessed");
  
  try {
      const { uid, food_preference, price_preference, notif_preference } = req.body;

      const foodPreferences = ['No Preference', 'Vegan', 'Vegetarian', 'Gluten Free', 'Vegan and Gluten Free', 'Vegetarian and Gluten Free'];
      const pricePreferences = ['Free', 'Paid, no food points', 'Paid, food points'];
      const notifPreferences = ['Often', 'Sometimes', 'Never'];

      if (!foodPreferences.includes(food_preference) || !pricePreferences.includes(price_preference) || !notifPreferences.includes(notif_preference)) {
          return res.status(400).json({ error: 'Invalid preference value' });
      }

      // Update the Preferences table for the specified uid in the database
      const results = await pool.query('UPDATE Preferences SET food_preference = $1, price_preference = $2, notif_preference = $3 WHERE uid = $4 RETURNING *', [food_preference, price_preference, notif_preference, uid]);

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

*/

/*

Review Viraj's endpoint for updating number of reports (needs some javascript checking, looks relatively fine?)

app.post('/api/event/:event_id/report', async (req, res) => {
  console.log("POST /api/event/:event_id/report accessed");

  const { event_id } = req.params;

  // Begin a transaction
  const client = await pool.connect();

  try {
      // Start the transaction
      await client.query('BEGIN');

      // Update the numReports for the event
      const updateEventQuery = 'UPDATE Event SET num_reports = num_reports + 1 WHERE event_id = $1 RETURNING num_reports, host_uid';
      const eventResult = await client.query(updateEventQuery, [event_id]);

      // If no event was found, rollback and return an error
      if (eventResult.rowCount === 0) {
          await client.query('ROLLBACK');
          return res.status(404).json({ error: 'Event not found' });
      }

      // Extract the updated numReports and host_uid
      const { num_reports, host_uid } = eventResult.rows[0];

      // Update the numReports for the host user
      const updateUserQuery = 'UPDATE Users SET numReports = numReports + 1 WHERE uid = $1';
      await client.query(updateUserQuery, [host_uid]);

      // Commit the transaction
      await client.query('COMMIT');

      // Respond with the updated report counts
      res.json({ event_id: event_id, num_reports: num_reports });

  } catch (err) {
      // If there's an error, rollback the transaction
      await client.query('ROLLBACK');
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
  } finally {
      // Release the client back to the pool
      client.release();
  }
});
*/

/*
TODO: review Viraj's query for likes API (the functionality of liking and unliking can maybe be integrated into one button or two buttons that call this endpoint)

app.post('/api/event/:event_id/like', async (req, res) => {
  console.log("POST /api/event/:event_id/like accessed");

  const { event_id } = req.params;
  const { action } = req.body; // Assuming 'like' or 'unlike' will be sent in the body

  // SQL query strings for incrementing and decrementing likes
  const likeQuery = 'UPDATE Event SET num_likes = num_likes + 1 WHERE event_id = $1 RETURNING num_likes';
  const unlikeQuery = 'UPDATE Event SET num_likes = num_likes - 1 WHERE event_id = $1 AND num_likes > 0 RETURNING num_likes';

  try {
      // Check if the action is valid
      if (!['like', 'unlike'].includes(action)) {
          return res.status(400).json({ error: 'Invalid action' });
      }

      // Choose the query based on the action
      const query = action === 'like' ? likeQuery : unlikeQuery;

      // Perform the update operation
      const results = await pool.query(query, [event_id]);

      // Check if any row was updated
      if (results.rowCount === 0) {
          return res.status(404).json({ error: 'Event not found or no likes to remove' });
      }

      // Respond with the updated likes count
      res.json({ num_likes: results.rows[0].num_likes });

  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
  }
});

*/


// API endpoint to get all events with an order by votes
app.get('/api/events', async (req, res) => {
  try {
    const results = await db.query('SELECT * FROM Events ORDER BY (num_upvotes - num_downvotes) DESC;');
    res.json(results.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// API endpoint to post an event
app.post('/api/post_event', async (req, res) => {
  try {
    const { event_id, host_uid, title, description, start_time, end_time, food_type, price_type, num_upvotes, num_downvotes } = req.body;
    const insertQuery = 'INSERT INTO Event (event_id, host_uid, title, description, start_time, end_time, food_type, price_type, num_upvotes, num_downvotes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *';
    const result = await db.query(insertQuery, [event_id, host_uid, title, description, start_time, end_time, food_type, price_type, num_upvotes, num_downvotes]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// API endpoint to upvote an event
app.post('/api/upvote_event', async (req, res) => {
  try {
    const { event_id } = req.body;
    const updateQuery = 'UPDATE Event SET num_upvotes = num_upvotes + 1 WHERE event_id = $1 RETURNING *';
    const result = await db.query(updateQuery, [event_id]);
    if (result.rowCount === 0) {
      return res.status(404).send('Event not found');
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// API endpoint to downvote an event
app.post('/api/downvote_event', async (req, res) => {
  try {
    const { event_id } = req.body;
    const updateQuery = 'UPDATE Event SET num_downvotes = num_downvotes + 1 WHERE event_id = $1 RETURNING *';
    const result = await db.query(updateQuery, [event_id]);
    if (result.rowCount === 0) {
      return res.status(404).send('Event not found');
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// API endpoint to search for events
app.get('/api/search_event', async (req, res) => {
  try {
    const { search_input } = req.query;
    if (!search_input) {
      return res.status(400).send('Search input is required');
    }
    const searchQuery = 'SELECT * FROM Event WHERE title ILIKE $1 ORDER BY start_time DESC;';
    const result = await db.query(searchQuery, [`%${search_input}%`]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Continue rewriting additional routes...


// More routes can be added here
