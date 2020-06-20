const { Client } = require('pg');

const config = require('./config');

const client = new Client({
    connectionString: config.connectionString,
    ssl: {
        rejectUnauthorized: false
      }
})
client.connect()

module.exports = client;