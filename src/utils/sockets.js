function getMessage(message, user) {
  const timestamp = new Date();
  const day = timestamp.getDate();
  const month = timestamp.getMonth() + 1;
  const year = timestamp.getFullYear();
  const hour = timestamp.getHours();
  const minutes = timestamp.getMinutes();
  const seconds = timestamp.getSeconds();

  return `${day}-${month}-${year} ${hour}:${minutes}:${seconds} - ${user}: ${message}`;
}

function ioConnection(io) {
  io.on('connection', (socket) => {
    socket.on('message', ({ chatMessage, nickname }) => {
      const message = getMessage(chatMessage, nickname);

      io.emit('message', message);
    });
  });
}

module.exports = ioConnection;
