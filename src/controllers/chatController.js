const router = require('express').Router();
// const { getMessages } = require('../models/chatModel');

// Preciso criar um getMessages() para pegar todas as mensagens do banco
// Preciso criar um setMessage() para adicionar uma nova mensagem ao banco
//

router.get('/', async (_req, res, _next) => {
  // const messages = await getMessages();
  res.status(200).render('chat');
});

module.exports = router;
