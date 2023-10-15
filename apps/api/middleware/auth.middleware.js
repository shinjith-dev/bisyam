const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const errorWrapper = require("./errorWrapper");

const verifyUser = errorWrapper(async (request, response, next) => {
  const authorization = request.get("authorization");

  if (!authorization)
    return response.status(401).json({ message: "Missing token" });

  if (authorization && authorization.startsWith("Bearer ")) {
    const token = authorization.replace("Bearer ", "");

    if (!token) return response.status(401).json({ message: "Unauthorized" });

    const { id } = jwt.verify(token, process.env.SECRET);
    const user = await User.findById(id);

    if (!user) return response.status(401).json({ message: "Unauthorized" });
    request.user = user;

    next();
  }
});

module.exports = verifyUser;
