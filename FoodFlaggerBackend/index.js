const app = require('./server');
const db = require('./db');
const pool = require('./db'); // Your configured PostgreSQL connection pool
const cors = require('cors');
app.use(cors()); // Using the CORS middleware

app.post('/api/login', async (req, res) => {
  console.log("POST /api/login accessed");

  try {
    // Extract the values from the request body
    const { email, netid, password } = req.body;
    console.log(email, netid, password)
    // Find the user in the database
    const query = 'SELECT EXISTS (SELECT 1 FROM Users WHERE email= $1 AND netid = $2 AND password = $3)';
    const results = await pool.query(query, [email, netid, password]);

    // Check if user was found
    const userExists = results.rows[0].exists;

    // Respond with whether the user exists
    res.json({ exists: userExists });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// API endpoint to get all events with an order by votes
app.get('/api/events', async (req, res) => {
  try {
    const netid = req.query.netid;
    const searchTerm = req.query.searchTerm;

    let query = 'SELECT * FROM Events ORDER BY num_likes DESC';
    let queryParams = [];

    if (netid) {
      // Adjusted query to handle "No Preference" correctly
      query = `
        SELECT E.*
        FROM Events E
        JOIN Preferences P ON (E.food_type = P.food_preference OR P.food_preference = 'No Preference')
        AND (E.price_type = P.price_preference OR P.price_preference = 'Free')
        JOIN Users U ON P.uid = U.uid
        WHERE U.netid = $1
        ORDER BY E.num_likes DESC`;
      queryParams = [netid];
    } else if (searchTerm) {
      query = 'SELECT * FROM Events WHERE title LIKE $1 OR description LIKE $1 ORDER BY num_likes DESC';
      queryParams = [`%${searchTerm}%`];
    }

    const results = await db.query(query, queryParams);
    res.json(results.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});




// API endpoint to post an event
app.post('/api/post_event/:netid', async (req, res) => {
  try {
    
    // Extract netid and other event details from the request body
    const { netid } = req.params;
    const { title, description, start_time, end_time, food_type, price_type } = req.body;
    const host_uid = await getUidFromNetid(netid);
    // Lookup the host_uid based on the netid provided
    

    // Insert the new event into the Event table
    const insertQuery = `
      INSERT INTO Events (host_uid, title, description, start_time, end_time, food_type, price_type, num_likes, num_reports)
      VALUES ($1, $2, $3, $4, $5, $6, $7, 0, 0)
      RETURNING *`;
    const result = await db.query(insertQuery, [host_uid, title, description, start_time, end_time, food_type, price_type]);

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
    const updateQuery = 'UPDATE Events SET num_likes = num_likes + 1 WHERE event_id = $1 RETURNING *';
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


app.post('/api/report_event', async (req, res) => {
  try {
    const { event_id } = req.body;
    const updateQuery = 'UPDATE Events SET num_reports = num_reports + 1 WHERE event_id = $1 RETURNING *';
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


//update preferences

app.put('/api/update_preferences/:netid', async (req, res) => {
  try {
    const { netid } = req.params;
    const {food_preference, price_preference, notif_preference } = req.body;
    
    // You'll need to find the user's uid based on their netid first
    const uid = await getUidFromNetid(netid);

    // Update the Preferences table with the new values for the user
    const updateQuery = `
      UPDATE Preferences
      SET food_preference = $2, price_preference = $3, notif_preference = $4
      WHERE uid = $1
      RETURNING *`;
    const updateResult = await db.query(updateQuery, [uid, food_preference, price_preference, notif_preference]);
    
    res.json(updateResult.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.get('/api/preferences/:netid', async (req, res) => {
  try {
    const { netid } = req.params;

    // Assuming you have a function to get uid from netid. If not, you'll need to query it from your Users table.
    const uid = await getUidFromNetid(netid);

    const preferencesQuery = 'SELECT * FROM Preferences WHERE uid = $1';
    const preferencesRes = await db.query(preferencesQuery, [uid]);

    if (preferencesRes.rows.length > 0) {
      res.json(preferencesRes.rows[0]);
    } else {
      res.status(404).json({ message: 'Preferences not found for the given netid.' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Helper function to get uid from netid
async function getUidFromNetid(netid) {
  // Replace with your actual query to get uid from netid
  const userRes = await db.query('SELECT uid FROM Users WHERE netid = $1', [netid]);
  if (userRes.rows.length > 0) {
    return userRes.rows[0].uid;
  } else {
    throw new Error('User not found');
  }
}



// API endpoint to search for events
app.get('/api/search_event', async (req, res) => {
  try {
    const { search_input } = req.query;
    if (!search_input) {
      return res.status(400).send('Search input is required');
    }
    const searchQuery = 'SELECT * FROM Events WHERE title ILIKE $1 ORDER BY start_time DESC;';
    const result = await db.query(searchQuery, [`%${search_input}%`]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});



app.get('/api/user_leaderboard', async (req, res) => {
  console.log("GET /api/users/leaderboard accessed");

  const curPage = parseInt(req.query.page, 10) || 1;
  const perPage = parseInt(req.query.perPage, 10) || 10; // Default to 10 if not provided

  try {
    // First, get the total count of users
    const countQuery = 'SELECT COUNT(DISTINCT uid) FROM Users';
    const countResult = await pool.query(countQuery);
    const totalUsers = countResult.rows[0].count;

    // SQL query to fetch users and their sum of likes, with pagination
    const query = `
      SELECT 
        u.uid, 
        u.netid, 
        u.email, 
        COALESCE(SUM(e.num_likes), 0) AS total_likes
      FROM Users u
      LEFT JOIN Events e ON u.uid = e.host_uid
      GROUP BY u.uid
      ORDER BY total_likes DESC
      OFFSET ${(curPage - 1) * perPage} ROWS
      FETCH NEXT ${perPage} ROWS ONLY
    `;
    const results = await pool.query(query);

    // Respond with the sorted user list and pagination details
    res.status(200).json({
      message: "Fetched user leaderboard",
      users: results.rows,
      curPage: curPage, // curPage is now correctly treated as a number
      maxPage: Math.ceil(totalUsers / perPage)
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});



// Continue rewriting additional routes...


// More routes can be added here
