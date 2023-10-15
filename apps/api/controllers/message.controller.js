const errorWrapper = require("../middleware/errorWrapper");
const Chat = require("../models/chat.model");
const User = require("../models/user.model");
const { isFriend, findChat } = require("../services/users.service");

const sendMessage = errorWrapper(async (request, response) => {
  const { message, recipient } = request.body;
  const { user } = request;

  if (!(message && recipient)) {
    return response.status(400).json({
      message: "Missing fields; recipient and content is required.",
      success: false,
    });
  }

  const newMessage = {
    content: message,
    recipient,
    sender: user._id,
    sent_at: Date.now(),
    modified_at: Date.now(),
  };

  const existingChat = await findChat(user._id, recipient);

  if (!existingChat) {
    const receiver = await User.findById(recipient);
    if (!receiver) {
      return response
        .status(400)
        .json({ message: "Invalid recepient.", success: false });
    }

    if (!(await isFriend(user._id, recipient))) {
      return response.status(403).json({
        message: "Can't send message; you are not friends.",
        success: false,
      });
    }

    const chat = new Chat({
      participants: [user._id, receiver._id],
      messages: [newMessage],
      recentMessages: [newMessage],
    });
    await chat.save();

    return response
      .status(201)
      .json({ message: "message sent", success: true });
  }

  if (existingChat.recentMessages.length > 10)
    existingChat.recentMessages.pull();
  existingChat.recentMessages.push(newMessage);
  existingChat.messages.push(newMessage);
  await existingChat.save();

  response.status(201).json({ message: "message sent", success: true });
});

const getMessages = errorWrapper(async (request, response) => {
  const { user } = request;
  const { page = 1, limit = 10 } = request.query;

  const messages = await Chat.find({ participants: { $in: user._id } })
    .populate("messages.sender")
    .populate("participants")
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

  response.status(200).json({
    message: "fetched chats successfully",
    data: messages,
    success: true,
  });
});

const getChatMessages = errorWrapper(async (request, response) => {
  const { chatId } = request.params;

  const chat = await Chat.findById(chatId);

  if (!chat) {
    return response
      .status(200)
      .json({ message: "Invalid chatId", success: false });
  }

  response.status(200).json({
    message: "fetched messages successfully",
    data: chat.messages,
    success: true,
  });
});

module.exports = { sendMessage, getMessages, getChatMessages };
