const Chat = require("../models/chat.model");
const Friends = require("../models/friends.model");

const isFriend = async (userId, targetId) =>
  Boolean(
    await Friends.findOne({
      user: userId,
      friends: { $elemMatch: { user: targetId } },
    }),
  );

const findChat = async (userId, targetId) => {
  const chat = await Chat.findOne({
    participants: { $all: [userId, targetId] },
  });
  return chat || null;
};

const isChat = () => false;

module.exports = { isFriend, findChat, isChat };
