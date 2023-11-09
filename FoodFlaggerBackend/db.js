const { Pool } = require('pg');
const dbConfig = require('./config/config');

const pool = new Pool(dbConfig);

module.exports = {
  query: (text, params) => pool.query(text, params),
};
