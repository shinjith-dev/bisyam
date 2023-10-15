const User = require("../models/user.model");

const generateUniqueUsername = (proposedName, next) =>
  User.findOne({ username: proposedName })
    .then((account) => {
      if (account) {
        // eslint-disable-next-line no-param-reassign
        proposedName += Math.floor(Math.random() * 100 + 1);
        return generateUniqueUsername(proposedName);
      }
      return proposedName;
    })
    .catch((err) => {
      next(err);
    });

module.exports = generateUniqueUsername;
