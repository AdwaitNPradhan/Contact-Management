/**
 *
 * @param {*} err Error Object from origin
 * @param {*} origin Place where the error originated
 * @param {*} message Additional message to show
 * @returns
 */
const error5xx = (err, origin, message, log = true) => {
  let error = {
    Err: {
      code: err.code,
      message: err.message,
      stack: err.stack,
    },
    origin: origin,
    message: message,
  };

  log && console.error(err);
  return { error: error };
};
/**
 *
 * @param {*} origin
 * @param {*} message
 * @returns
 */
const error4xx = (origin, message) => {
  let error = {
    origin: origin,
    message: message,
  };
  return { error: error };
};

module.exports = {
  error4xx,
  error5xx,
};
