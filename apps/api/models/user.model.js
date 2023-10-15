/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const mongoose = require("mongoose");
const mongooseUniqueValidator = require("mongoose-unique-validator");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: 4,
      trim: true,
      validate: [
        /^(?=.{4,20}$)(?![.])[a-z0-9._]+$/,
        "can only contain the letters (a-z), (0-9), (.), and (_), cannot begin with a (.), and must be between 4 and 20 characters long!",
      ],
    },
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      validate: [isEmail, "Invalid email format"],
      required: false,
      unique: true,
      trim: true,
    },
    profileUrl: String,
    provider: { type: String, default: "bisyam" },
    passwordHash: String,
    is_active: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } },
);

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

userSchema.plugin(mongooseUniqueValidator);

const User = mongoose.model("User", userSchema);

module.exports = User;
