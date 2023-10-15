const messageRoutes = require("express").Router();
const {
  sendMessage,
  getMessages,
  getChatMessages,
} = require("../../controllers/message.controller");

messageRoutes.get("/", getMessages);
messageRoutes.get("/:chatId", getChatMessages);
messageRoutes.post("/", sendMessage);

module.exports = messageRoutes;
