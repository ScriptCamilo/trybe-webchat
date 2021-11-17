const router = require('express').Router();
const { getMessages } = require('../models/chatModel');
const formatMessage = require('../utils/formatMessage');

router.get('/', async (_req, res, _next) => {
  const serverMessages = await getMessages();
  const messages = serverMessages.map((message) => formatMessage(message));
  res.status(200).render('chat', { messages });
});

module.exports = router;
