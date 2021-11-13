const router = require('express').Router();

router.get('/', (_req, res, _next) => {
  res.status(200).render('chat');
});

module.exports = router;
