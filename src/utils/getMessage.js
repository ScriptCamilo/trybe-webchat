function getMessage({ chatMessage, nickname }, time) {
  return `${time} - ${nickname}: ${chatMessage}`;
}

module.exports = getMessage;
