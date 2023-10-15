const router = require("express").Router();
const verifyUser = require("../middleware/auth.middleware");
const authRoutes = require("./auth/auth.routes");
const messageRoutes = require("./user/message.routes");

router.use("/auth", authRoutes);

router.use(verifyUser);
router.use("/message", messageRoutes);

module.exports = router;
