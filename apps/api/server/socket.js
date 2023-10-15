const { Server } = require("socket.io");
const server = require("./app");
const configs = require("../configs");

const io = new Server(server, {
  cors: { origin: [`${configs.frontendUrl}*`, "http://localhost:*"] },
});

io.use(async (socket, next) => {
  const { token } = socket.handshake.auth;
  if (!token) {
    return new Error("missing token");
  }
  try {
    const { id } = jwt.verify(token, process.env.SECRET);
    const user = await User.findById(id);

    if (!user) return new Error("Unauthorized");

    const { id: uid, username, name, profileUrl } = user;
    socket.user = {
      uid,
      username,
      name,
      profileUrl,
    };

    const friendsList = await Friends.findOne({ user: socket.user.uid }, [
      "friends",
    ]).populate("friends.user", {
      id: 1,
    });

    socket.friends =
      friendsList && friendsList.friends
        ? friendsList.friends.map((friend) => friend.user.id.toString())
        : [];

    next();
  } catch (e) {
    next(e);
  }
});

io.on("connection", async (socket) => {
  logger.info(
    "[socket]",
    `${socket.user.username}(${socket.user.uid})`,
    "connected to socket",
  );

  try {
    await User.findByIdAndUpdate(socket.user.uid, {
      $set: { is_active: true },
    });
  } catch (e) {
    return new Error("Failed to update active status");
  }

  socket.is_active = true;
  socket.join(socket.user.uid);
  if (socket.friends && socket.friends.length > 0) socket.join(socket.friends);

  socket.on("start-chat", (chatId) => {
    socket.join(chatId);
    socket.chat = chatId;
    if (!socket?.prevChat) socket.prevChat = chatId;
    else {
      io.in(socket.prevChat).emit("receiver-active", {
        username: socket.user.username,
        is_active: false,
      });
    }
    io.in(socket.chat).emit("receiver-active", {
      username: socket.user.username,
      is_active: true,
    });
    logger.info("[socket]", `${socket.user.username} joined ${socket.chat}`);
  });

  socket.on("send-message", (message) => {
    if (!socket.chat) return new Error("You have to select a chat first");
    logger.info(
      "[socket]",
      socket.user.username,
      `send "${message.content}" to ${message.recipient}`,
    );
    io.in(socket.chat).emit("get-message", message);
  });

  if (socket.friends && socket.friends.length > 0) {
    const { uid: id, username, name, profileUrl } = socket.user;
    io.in(id).emit("active-user", {
      id,
      username,
      name,
      profileUrl,
      is_active: true,
    });
  }

  socket.on("disconnect", async () => {
    socket.is_active = false;

    try {
      await User.findByIdAndUpdate(socket.user.uid, {
        $set: { is_active: socket.is_active },
      });
    } catch (e) {
      return new Error("Failed to update active status");
    }

    if (socket?.chat) {
      io.in(socket.chat).emit("receiver-active", {
        username: socket.user.username,
        is_active: socket.is_active,
      });
      socket.leave(socket.chat);
    }

    if (socket.friends && socket.friends.length > 0) {
      io.in(socket.user.uid).emit("active-user", {
        id: socket.user.uid,
        is_active: socket.is_active,
      });
      socket.leave(socket.user.uid);
      socket.leave(socket.friends);
    }
    logger.info("[socket]", socket.user.username, "disconnected from socket");
  });
});
