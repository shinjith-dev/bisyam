/* eslint-disable no-param-reassign */
const mongoose = require("mongoose");
const mongooseUniqueValidator = require("mongoose-unique-validator");

const friendsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    friends: [
      {
        id: { type: String, required: true },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        since: String,
      },
    ],
    requests: [
      {
        id: { type: String, required: true },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        isReceived: { type: Boolean, required: true, default: false },
        sent_at: String,
      },
    ],
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } },
);

friendsSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

friendsSchema.plugin(mongooseUniqueValidator);

const Friends = mongoose.model("Friends", friendsSchema);

module.exports = Friends;
