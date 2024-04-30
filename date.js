function getCurrentDate() {
  const currentDate = new Date();
  return `it's time now ${currentDate.getFullYear()}:${currentDate.getMonth() + 1}:${currentDate.getDate()}`;
}

module.exports = getCurrentDate;