const connection = require('./connection');

const collectionName = 'messages';

async function insertMessage(message) {
  const db = await connection();
  await db.collection(collectionName).insertOne(message);
}

async function getMessages() {
  const db = await connection();
  const messages = db.collection(collectionName).find().toArray();
  return messages;
}

module.exports = {
  insertMessage,
  getMessages,
};
