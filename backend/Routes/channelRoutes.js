const express = require("express");
const { authenticate } = require("../Middleware/authMiddleware");
const { fetchChannelDetails, fetchChannels, createChannel, updateChannel, deleteChannel } = require("../Controllers/channelController");

const router = express.Router();

router.get('/:id', fetchChannelDetails);
router.get('/', fetchChannels);
router.post('/', authenticate, createChannel); 
router.put('/:id', authenticate, updateChannel);
router.delete('/:id', authenticate, deleteChannel);

// add a field that fetches channel based on search parameter

module.exports = router;