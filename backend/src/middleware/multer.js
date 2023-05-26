const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const avatarStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./public/uploads/avatar/");
  },
  filename(req, file, cb) {
    cb(null, `${uuidv4()}-${file.originalname}`);
  },
});

const eventStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "./public/uploads/image/");
  },
  filename(req, file, cb) {
    cb(null, `${uuidv4()}-${file.originalname}`);
  },
});

const uploadAvatar = multer({ storage: avatarStorage });

const uploadEvent = multer({ storage: eventStorage });

module.exports = { uploadAvatar, uploadEvent };
