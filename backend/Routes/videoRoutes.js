const express = require("express");
const { authenticate } = require("../Middleware/authMiddleware");

const router = express.Router();

router.get('/:id', fetchVideoDetails);
router.get('/', fetchVideos);
router.post('/:id', authenticate, addVideo);
router.put('/:id', authenticate, editVideoDetails);
router.delete('/:id', authenticate, deleteVideo);

module.exports(router);