const express = require("express");
const { authenticate } = require("../Middleware/authMiddleware");
const { searchVideosAndChannels } = require("../Controllers/videoController");

const router = express.Router();

router.get('/', searchVideosAndChannels);

module.exports = router;