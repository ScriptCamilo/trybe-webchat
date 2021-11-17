function getTime() {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const timestamp = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;

  return timestamp;
}

module.exports = getTime;
