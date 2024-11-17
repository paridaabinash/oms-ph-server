require('dotenv').config();
const auth = require('./authController')
const nano = require('nano');
const couchDBUrl = `https://${process.env.COUCHDB_USER}:${await auth.hashPassword(process.env.COUCHDB_PASSWORD)}@${process.env.COUCHDB_URL}`
    || `https://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@localhost:5984`; //`http://${username}:${password}@localhost:5984`; // Update this with your CouchDB URL
const dbName = 'whiteeagle'; // Your CouchDB database name
const db = nano(couchDBUrl).use(dbName);

module.exports = { db, couchDBUrl, dbName };