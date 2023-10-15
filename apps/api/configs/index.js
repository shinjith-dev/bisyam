const cloudinary = require("./cloudinary");

require("dotenv").config();

const { PORT, SECRET, FRONTEND_URL, SALT_ROUNDS } = process.env;
const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

module.exports = {
  port: PORT,
  mongodbUri: MONGODB_URI,
  frontendUrl: FRONTEND_URL,
  secret: SECRET,
  saltRounds: Number(SALT_ROUNDS),
  cloudinary,
};
