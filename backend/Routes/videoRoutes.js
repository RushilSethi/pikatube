const express = require("express");
const { authenticate } = require("../Middleware/authMiddleware");
const { interactWithVideo } = require("../Controllers/videoController");

const router = express.Router();

router.get('/:id', fetchVideoDetails);
router.get('/', fetchVideos);
router.post('/:id', authenticate, addVideo);
router.put('/:id', authenticate, editVideoDetails);
router.delete('/:id', authenticate, deleteVideo);
router.put('/:id', authenticate, interactWithVideo );

// add a route that fetches videos only based on search parameter

module.exports(router);