const { info } = require("../utils/logger");

const requestLogger = (request, response, next) => {
  info("[api]", request.method, request.path);
  info("[api]", "body:  ", request.body);
  next();
};

module.exports = requestLogger;
