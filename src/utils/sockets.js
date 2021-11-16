const { insertMessage } = require('../models/chatModal');

function getTime() {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const clientTimestamp = `${day}-${month}-${year} ${hour}:${minutes}:${seconds}`;
  const timestamp = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;

  return {
    clientTimestamp,
    timestamp,
  };
}

function getMessage({ chatMessage, nickname }, time) {
  return `${time} - ${nickname}: ${chatMessage}`;
}

function ioConnection(io) {
  io.on('connection', (socket) => {
    socket.on('message', async (chatMessage) => {
      const time = getTime();
      const message = getMessage(chatMessage, time.clientTimestamp);
      const serverMessage = {
        message: chatMessage.message,
        nickname: chatMessage.nickname,
        timestamp: time.timestamp,
      };

      try {
        await insertMessage(serverMessage);
        io.emit('message', message);
      } catch (error) {
        console.log(error);
        socket.emit('message', 'Something went wrong');
      }
    });
  });
}

module.exports = ioConnection;
