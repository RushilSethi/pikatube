const express = require("express");
const { authenticate } = require("../Middleware/authMiddleware");
const { fetchChannelDetails, fetchChannels, createChannel, updateChannel, deleteChannel, getChannelsByIds } = require("../Controllers/channelController");

const router = express.Router();

router.get('/:id', fetchChannelDetails);
router.get('/', fetchChannels);
router.post('/by-ids', getChannelsByIds); //multiple request for fetching channel details for subscriptions page
router.post('/', authenticate, createChannel); 
router.put('/:id', authenticate, updateChannel);
router.delete('/:id', authenticate, deleteChannel);

// add a field that fetches channel based on search parameter(this field has been added in searchRoutes to fetch videos and channels by search query together)
//it's controller is in videoController
module.exports = router;