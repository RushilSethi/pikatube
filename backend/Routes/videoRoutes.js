const express = require("express");
const { authenticate } = require("../Middleware/authMiddleware");
const { fetchVideoDetails, getVideosByIds, fetchVideos, addVideo, editVideoDetails, deleteVideo, interactWithVideo, searchVideosAndChannels, increaseViews } = require("../Controllers/videoController");

const router = express.Router();

router.get('/:id', fetchVideoDetails);
router.post("/by-ids", getVideosByIds);
router.get('/', fetchVideos);
router.post('/:id', authenticate, addVideo);   //the id here refers to channelId 
router.put('/:id', authenticate, editVideoDetails);
router.delete('/:id', authenticate, deleteVideo);
router.put('/interact/:id', authenticate, interactWithVideo );
router.put('/views/:id', increaseViews);

module.exports = router;