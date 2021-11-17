const { insertMessage } = require('../models/chatModel');
const getTime = require('../utils/getTime');
const formatMessage = require('../utils/formatMessage');

function ioConnection(io) {
  io.on('connection', (socket) => {
    socket.on('message', async (chatMessage) => {
      const timestamp = getTime();

      const serverMessage = {
        message: chatMessage.chatMessage,
        nickname: chatMessage.nickname,
        timestamp,
      };

      const message = formatMessage(serverMessage);

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
