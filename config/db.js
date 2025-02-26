require('dotenv').config();
const nano = require('nano');
const couchDBUrl =
    //process.env.PROD == true ?
    `https://${process.env.COUCHDB_USER}:${process.env.COUCHDB_HPASSWORD}@${process.env.COUCHDB_URL}` 
    //`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@localhost:5984`;

const dbName = 'we';
const nanoInstance = nano(couchDBUrl);
const db = nanoInstance.db.use(dbName);
module.exports = { db, couchDBUrl, dbName };