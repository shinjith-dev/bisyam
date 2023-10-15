/* eslint-disable no-param-reassign */
const mongoose = require("mongoose");

const limitMessages = (arr) => arr.length <= 10;

const chatSchema = new mongoose.Schema(
  {
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    messages: [
      {
        content: { type: String, required: true },
        recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        sent_at: String,
        modified_at: String,
      },
    ],
    recentMessages: {
      type: [
        {
          content: { type: String, required: true },
          recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          sent_at: String,
          modified_at: String,
        },
      ],
      validate: [limitMessages, "recentMessages exceeds the limit of 10"],
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } },
);

chatSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
