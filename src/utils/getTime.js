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

module.exports = getTime;
