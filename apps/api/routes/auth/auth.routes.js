const authRoutes = require("express").Router();
const {
  register,
  login,
  googleAuth,
} = require("../../controllers/auth.controller");

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/google-auth", googleAuth);

module.exports = authRoutes;
