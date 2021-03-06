const socket = window.io('http://localhost:3000');
const messagesForm = document.querySelector('#message-form');
const messagesList = document.querySelector('#messages');
const messageBox = document.querySelector('#message-box');
const onlineUsers = document.querySelector('#online-users');
const onlineUser = document.querySelector('#online-user');
const nicknameForm = document.querySelector('#nickname-form');
const nicknameBox = document.querySelector('#nickname-box');

function addNewOnlineUser(newUser) {
  const li = document.createElement('li');
  li.innerText = newUser;
  li.setAttribute('data-testid', 'online-user');
  li.setAttribute('class', 'foreign-user');
  onlineUsers.appendChild(li);
}

function getUser() {
  const user = sessionStorage.getItem('user');
  return user;
}

function clearInput(input) {
  const inputBox = input;
  inputBox.value = '';
}

function listenOnlineUsers() {
  socket.on('newUser', (newUser) => {
    addNewOnlineUser(newUser.nickname);
  });

  // socket.on('onlineUsers', (users) => {
  //   const onlines = users.filter(({ id }) => id !== socket.id);
  //   onlines.forEach(({ nickname }) => {
  //     addNewOnlineUser(nickname);
  //   });
  // });

  socket.on('offlineUser', (users) => {
    const onlines = users.filter(({ id }) => id !== socket.id);
    const previous = document.querySelectorAll('.foreign-user');
    previous.forEach((child) => onlineUsers.removeChild(child));
    onlines.forEach(({ nickname }) => {
      addNewOnlineUser(nickname);
    });
  });
}

function setOnlineUser() {
  onlineUser.innerText = getUser();
  socket.emit('newUser', getUser());
}

// https://gist.github.com/6174/6062387
function randomChar() {
  return Math.random().toString(36).substring(2, 10);
}

function saveUser(newUser) {
  const char = randomChar() + randomChar();
  const user = sessionStorage.getItem('user');
  if (!user) sessionStorage.setItem('user', char);
  if (newUser) sessionStorage.setItem('user', newUser);
}

function changeNickname(e) {
  e.preventDefault();
  const newUser = nicknameBox.value;
  saveUser(newUser);
  setOnlineUser();
  clearInput(nicknameBox);
}

function createMessage(message) {
  const messageList = document.createElement('li');
  messageList.setAttribute('data-testid', 'message');
  messageList.innerText = message;
  messagesList.appendChild(messageList);
}

function listenMessages() {
  socket.on('message', (message) => {
    createMessage(message);
  });
}

function sendMessage(e) {
  e.preventDefault();
  const message = {
    chatMessage: messageBox.value,
    nickname: getUser(),
  };
  clearInput(messageBox);
  socket.emit('message', message);
}

messagesForm.addEventListener('submit', sendMessage);
nicknameForm.addEventListener('submit', changeNickname);

window.onload = () => {
  saveUser();
  listenMessages();
  setOnlineUser();
  listenOnlineUsers();
};

window.onbeforeunload = () => {
  socket.disconnect();
};
