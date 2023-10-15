/* eslint-disable camelcase */
const { v2: cloudinary } = require("cloudinary");
const { cloudinary: config } = require("../configs");
const errorWrapper = require("./errorWrapper");

cloudinary.config({
  cloud_name: config.name,
  api_key: config.apiKey,
  api_secret: config.apiSecret,
});

const upload = errorWrapper(async (path, public_id) => {
  const result = await cloudinary.uploader.upload(path, { public_id });
  return result;
});

module.exports = upload;
