const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

// to store in server
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const unique = uuidv4();
    cb(null, unique + ext);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    )
      cb(null, true);
    else cb(new Error("Invalid file type, use png or jpg/jpeg files"), false);
  },
  limits: { fileSize: 1024 * 1024 * 5 },
});

module.exports = upload;
