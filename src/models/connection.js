const { MongoClient } = require('mongodb');
require('dotenv').config();

const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const { DB_NAME, DB_URL } = process.env;

let db = null;

async function connection() {
  if (db) return Promise.resolve(db);
  const connect = await MongoClient.connect(DB_URL, OPTIONS);
  db = await connect.db(DB_NAME);
  return db;
}

module.exports = connection;
