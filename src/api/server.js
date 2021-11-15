const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const http = require('http').createServer(app);

const PORT = 3000;

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

const chatController = require('../controllers/chatController');

require('../utils/sockets')(io);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/public', express.static(path.join(__dirname, '../..', 'public/scripts')));

app.use('/', chatController);

app.use((err, _req, res, _next) => {
  const { status, message } = err;
  const statusCode = status || 500;

  res.status(statusCode).json({ message });
});

http.listen(PORT, () => console.log(`WebChat project running on port ${PORT}`));
