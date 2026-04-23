const multer = require("multer");
const path = require("path");

const uploadDir = process.env.UPLOAD_DIR || path.join(__dirname, "..", "..", "uploads", "clients");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

module.exports = upload;
