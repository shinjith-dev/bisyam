/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
const server = require("./server/app");
const config = require("./configs");
const logger = require("./utils/logger");

server.listen(config.port, () => {
  logger.info(`[server] server running on port ${config.port}`);
});
