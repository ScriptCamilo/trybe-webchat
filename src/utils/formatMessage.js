function formatMessage({ message, nickname, timestamp }) {
  const [timeDay, timeHour] = timestamp.split(' ');
  const [year, month, day] = timeDay.split('-');
  return `${day}-${month}-${year} ${timeHour} - ${nickname}: ${message}`;
}

module.exports = formatMessage;
