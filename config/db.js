require('dotenv').config();
const nano = require('nano');
const username = process.env.COUCHDB_USER;
const password = process.env.COUCHDB_PASSWORD;
const couchDBUrl = process.env.COUCHDB_URL || `http://${username}:${password}@localhost:5984`; //`http://${username}:${password}@localhost:5984`; // Update this with your CouchDB URL
const dbName = 'whiteeagle'; // Your CouchDB database name
const db = nano(couchDBUrl).use(dbName);

module.exports = { db, couchDBUrl, dbName, username, password };