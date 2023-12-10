const axios = require('axios');
const { JSDOM } = require('jsdom');
const { Pool } = require('pg');


const dbConfig = require('./config/config');
const pool = new Pool(dbConfig);

module.exports = {
  query: (text, params) => pool.query(text, params),
};

const scrapeData = async () => {
  const url = 'https://dukegroups.com/mobile_ws/v17/mobile_events_list';
  const params = {
    'range': '0',
    'limit': '40',
    'filter4_contains': 'OR',
    'filter4_notcontains': 'OR',
    'filter6': '8349646',
    'order': 'undefined',
    'search_word': ''
    };
  const headers = {
    'Accept': 'application/json, text/javascript, */*; q=0.01',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'en-US,en;q=0.9',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Cookie': 'CG.SessionID=fvy32cv1ddrrd21fkivr1wkn-zEzi%2blja0OKxC7xuFNNABIRa%2fA8%3d; _ga=GA1.2.1929615001.1702155538; _gid=GA1.2.497223764.1702155538; cg_uid=3588805-TMZsVHANlhjnMrA7Rk93B2EW2GvjJlB7h9kFZI1Sj/w=; _gat_UA-11274264-4=1; _ga_J32WC9NWNJ=GS1.2.1702155538.1.1.1702156960.0.0.0',
    'Referer': 'https://dukegroups.com/events',
    'Sec-Ch-Ua': '"Google Chrome";v="119", "Chromium";v="119", "NotA;Brand";v="24"',
    'Sec-Ch-Ua-Mobile': '?0',
    'Sec-Ch-Ua-Platform': '"macOS"',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
    'X-Requested-With': 'XMLHttpRequest'
    };

  try {
      const response = await axios.get(url, { params, headers });
      const events = response.data; // Assuming the response is the array of events
      return events.map(event => {
          // Extract and process event data
          const title = event.p3;
          const location = event.p6;
          const description = event.p30;
          // ... other processing steps

          return { title, location, description /*, other fields */ };
      });
  } catch (error) {
      console.error('Error during data scraping:', error);
      return [];
  }
};

const insertEventsToDatabase = async (events) => {
  const client = await pool.connect();
  try {
      await client.query('BEGIN');
      for (const event of events) {
          // Insert each event to the database
          // ... SQL INSERT query logic
      }
      await client.query('COMMIT');
  } catch (error) {
      await client.query('ROLLBACK');
      console.error('Error during database insertion:', error);
  } finally {
      client.release();
  }
};

const runScript = async () => {
  const events = await scrapeData();
  await insertEventsToDatabase(events);
  console.log('Data scraping and database update complete.');
};

runScript();
