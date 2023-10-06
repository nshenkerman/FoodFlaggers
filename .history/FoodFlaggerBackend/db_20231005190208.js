const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: '172.28.92.72.',
  database: 'FoodFlaggers',
  password: 'swimtenn1',
  port: 5432, // default PostgreSQL port
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
