const { error } = require("../utils/logger");

const errorWrapper = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (err) {
    error(err);
    next(err);
  }
};

module.exports = errorWrapper;
