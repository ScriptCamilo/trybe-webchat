const { insertMessage, getOnlineUsers, setOnlineUsers } = require('../models/chatModel');
const getTime = require('../utils/getTime');
const formatMessage = require('../utils/formatMessage');

async function handleMessages(io, socket, chatMessage) {
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
}

function handleUsers(socket, nickname) {
  let userExists = false;
  const user = {
    id: socket.id,
    nickname,
  };

  const auxOnlineUsers = getOnlineUsers().map((onUser) => {
    if (onUser.id === socket.id) {
      userExists = true;
      return user;
    }
    return onUser;
  });

  setOnlineUsers(auxOnlineUsers, true);
  if (userExists) return socket.broadcast.emit('offlineUser', auxOnlineUsers);

  setOnlineUsers(user);
  socket.broadcast.emit('newUser', user);
}

function ioConnection(io) {
  io.on('connection', (socket) => {
    socket.emit('onlineUsers', getOnlineUsers()); // Send online users to new connections

    socket.on('message', async (chatMessage) => {
      await handleMessages(io, socket, chatMessage);
    });

    socket.on('newUser', (nickname) => handleUsers(socket, nickname)); // Send new user to old connections

    socket.on('disconnect', () => {
      const auxOnlineUsers = getOnlineUsers().filter(({ id }) => id !== socket.id);
      setOnlineUsers(auxOnlineUsers, true);
      io.emit('offlineUser', auxOnlineUsers);
    });
  });

  io.emit('connection', 'teste');
}

module.exports = ioConnection;
