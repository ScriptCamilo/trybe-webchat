const socket = window.io('http://localhost:3000');
const form = document.querySelector('#sendMessage');
const messageInput = document.querySelector('#messageInput');

function listenMessages() {
  socket.on('message', (message) => {
    console.log(message);
  });
}

function clearInput() {
  messageInput.value = '';
}

// https://gist.github.com/6174/6062387
function randomChar() {
  return Math.random().toString(36).substring(2, 10);
}

function saveRandomUser() {
  const char = randomChar() + randomChar();
  const user = sessionStorage.getItem('user');
  if (!user) sessionStorage.setItem('user', char);
}

function getUser() {
  const user = sessionStorage.getItem('user');
  return user;
}

function sendMessage(e) {
  e.preventDefault();
  const message = {
    chatMessage: messageInput.value,
    nickname: getUser(),
  };
  clearInput();
  socket.emit('message', message);
}

form.addEventListener('submit', sendMessage);

window.onload = () => {
  saveRandomUser();
  listenMessages();
};
