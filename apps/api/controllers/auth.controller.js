const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtDecode = require("jwt-decode");
const errorWrapper = require("../middleware/errorWrapper");
const User = require("../models/user.model");
const { secret, saltRounds } = require("../configs");
const Friends = require("../models/friends.model");
const { isValidPassword } = require("../utils/validator");
const { info } = require("../utils/logger");
const generateUniqueUsername = require("../utils/uniqueUsername");

const register = errorWrapper(async (request, response) => {
  const { username, name, password, email } = request.body;

  if (!(username && name && password && email)) {
    return response.status(400).json({
      message:
        "Missing fields; username, name, email and password are required",
      success: false,
    });
  }

  if (!isValidPassword(password)) {
    return response.status(400).json({
      message:
        "passwords must be between 8 and 20 characters long, with at least one letter, one number, and one special character!",
      success: false,
    });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return response.status(400).json({
      message: "User already exists with this email",
      success: false,
    });
  }

  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    email,
    passwordHash,
  });
  const savedUser = await user.save();

  const friends = new Friends({
    user: savedUser.id,
    friends: [],
    requests: [],
  });
  await friends.save();

  const userForToken = {
    username: savedUser.username,
    uid: savedUser.id,
  };

  const token = jwt.sign(userForToken, secret, {
    expiresIn: 60 * 60 * 24 * 7,
  });

  response.status(200).json({
    message: `Welcome to bisyam ${user.name}`,
    data: { token, user },
    success: true,
  });
});

const login = errorWrapper(async (request, response) => {
  const { username, password } = request.body;

  if (!(username && password)) {
    return response.status(400).json({
      message: "Missing fields; username and password are required",
      success: false,
    });
  }

  const user = await User.findOne({ username }, [
    "username",
    "name",
    "passwordHash",
    "profileUrl",
    "email",
  ]);

  if (!user) {
    return response
      .status(401)
      .json({ message: "Invalid username or password", success: false });
  }

  const isCorrectPassword = await bcrypt.compare(password, user.passwordHash);
  if (!isCorrectPassword) {
    return response
      .status(401)
      .json({ message: "Invalid username or password", success: false });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };
  const token = jwt.sign(userForToken, secret, {
    expiresIn: 60 * 60 * 24 * 7,
  });
  delete user.passwordHash;

  response.status(200).json({
    message: `Welcome back to bisyam ${user.name}`,
    data: { token, user },
    success: true,
  });
});

const googleAuth = errorWrapper(async (request, response, next) => {
  const { credential } = request.body;

  if (!credential) {
    return response.status(400).json({
      message: "Missing credential.",
      success: false,
    });
  }

  const userFromToken = jwtDecode(credential);
  const { email, name, exp, picture } = userFromToken;

  const existingUser = await User.findOne({ email }, [
    "username",
    "name",
    "profileUrl",
    "email",
  ]);

  if (existingUser && existingUser.provider !== "bisyam") {
    const userForToken = {
      username: existingUser.username,
      id: existingUser._id,
    };

    const token = jwt.sign(userForToken, secret, { expiresIn: exp });

    return response.status(200).json({
      message: `Welcome back to bisyam ${existingUser.name}`,
      data: { token, user: existingUser },
      success: true,
    });
  }

  const username = await generateUniqueUsername(
    String(email).split("@")[0].slice(0, 8),
    next,
  );
  const newUser = new User({
    username,
    name,
    email,
    provider: "google",
    profileUrl: picture,
  });
  const savedUser = await newUser.save();

  const friends = new Friends({
    user: savedUser.id,
    friends: [],
    requests: [],
  });
  await friends.save();

  const userForToken = {
    username: savedUser.username,
    id: savedUser.id,
  };

  const token = jwt.sign(userForToken, secret, { expiresIn: exp });

  response.status(200).json({
    message: `Welcome to bisyam ${existingUser.name}`,
    data: { token, user: savedUser },
    success: true,
  });
});

module.exports = { register, login, googleAuth };
