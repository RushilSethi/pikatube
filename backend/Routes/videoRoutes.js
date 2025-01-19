const express = require("express");
const { authenticate } = require("../Middleware/authMiddleware");
const { fetchVideoDetails, fetchVideos, addVideo, editVideoDetails, deleteVideo, interactWithVideo } = require("../Controllers/videoController");

const router = express.Router();

router.get('/:id', fetchVideoDetails);
router.get('/', fetchVideos);
router.post('/:id', authenticate, addVideo);   //the id here refers to channelId 
router.put('/:id', authenticate, editVideoDetails);
router.delete('/:id', authenticate, deleteVideo);
router.put('/interact/:id', authenticate, interactWithVideo );

// add a route that fetches videos only based on search parameter

module.exports = router;