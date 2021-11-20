const router = require('express').Router();
const { getMessages, getOnlineUsers } = require('../models/chatModel');
const formatMessage = require('../utils/formatMessage');

router.get('/', async (_req, res, _next) => {
  const serverMessages = await getMessages();
  const onlineUsers = getOnlineUsers();
  const messages = serverMessages.map((message) => formatMessage(message));
  res.status(200).render('chat', { messages, onlineUsers });
});

module.exports = router;
