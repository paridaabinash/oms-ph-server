const nano = require('nano');
const username = 'admin';
const password = 'admin';
const couchDBUrl = `http://${username}:${password}@localhost:5984`; // Update this with your CouchDB URL
const dbName = 'whiteeagle'; // Your CouchDB database name

const db = nano(couchDBUrl).use(dbName);

module.exports = { db, couchDBUrl, dbName, username, password };