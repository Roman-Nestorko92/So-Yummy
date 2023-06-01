const multer = require("multer");
const path = require("path");
const { HttpError } = require("../helpers");

const tempDir = path.resolve("src/temp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    const uniquePrefix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniquePrefix}_${file.originalname}`);
  },
});

const upload = multer({
  storage: multerConfig,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: (req, file, cb) => {
    const extention = file.originalname.split(".").pop();
    if (extention !== "jpg" && extention !== "png" && extention !== "jpeg") {
      cb(HttpError(400, "File format not allow"));
    }
    cb(null, true);
  },
});

module.exports = upload;
