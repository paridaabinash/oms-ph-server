require('dotenv').config();
const nano = require('nano');
const couchDBUrl = process.env.COUCHDB_URL
    ? `https://${process.env.COUCHDB_USER}:${process.env.COUCHDB_HPASSWORD}@${process.env.COUCHDB_URL}`
    : `https://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@localhost:5984`;

const dbName = 'whiteeagle';
const nanoInstance = nano(couchDBUrl);
const db = nanoInstance.db.use(dbName);
module.exports = { db, couchDBUrl, dbName };