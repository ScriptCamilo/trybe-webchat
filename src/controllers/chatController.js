const router = require('express').Router();

// Preciso criar um getMessages() para pegar todas as mensagens do banco
// Preciso criar um setMessage() para adicionar uma nova mensagem ao banco
//

router.get('/', (_req, res, _next) => {
  res.status(200).render('chat');
});

module.exports = router;
