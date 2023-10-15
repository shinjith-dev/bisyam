const express = require("express");
const http = require("http");

const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("../configs");
const logger = require("../utils/logger");
const errorHandler = require("../middleware/errorHandler");
const requestLogger = require("../middleware/logger");
const unknownEndpoint = require("../middleware/unknownEndpoint");
const routes = require("../routes");

logger.info("[server]", "connecting to MongoDB");

mongoose
  .connect(config.mongodbUri)
  .then(() => {
    logger.info("[server]", "connected to MongoDB");
  })
  .catch((error) => {
    logger.error("[server]", "Error connecting to MongoDB: ", error.message);
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

app.get("/api/", (req, res) => {
  res.status(200).json({ message: "started bisyam", success: true });
});

app.use("/api/", routes);

app.use(unknownEndpoint);
app.use(errorHandler);

const server = http.createServer(app);
module.exports = server;
