// const { insertMessage } = require('../models/chatModel');
const getTime = require('../utils/getTime');
const getMessage = require('../utils/getMessage');

function ioConnection(io) {
  io.on('connection', (socket) => {
    socket.on('message', async (chatMessage) => {
      const time = getTime();
      const message = getMessage(chatMessage, time.clientTimestamp);
      // const serverMessage = {
      //   message: chatMessage.message,
      //   nickname: chatMessage.nickname,
      //   timestamp: time.timestamp,
      // };

      try {
        // await insertMessage(serverMessage);
        io.emit('message', message);
      } catch (error) {
        // console.log(error);
        socket.emit('message', 'Something went wrong');
      }
    });
  });
}

module.exports = ioConnection;
