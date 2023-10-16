module.exports = (message, statuscode) => {
  const error = new Error(message);
  error.statuscode = statuscode;
  throw error;
};
