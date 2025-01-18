const express = require("express");
const { authenticate } = require("../Middleware/authMiddleware");

const router = express.Router();

router.get('/:id', fetchChannelDetails);
router.get('/', fetchChannels);
router.post('/:id', authenticate, createChannel);
router.put('/:id', authenticate, editChannelDetails);
router.delete('/:id', authenticate, deleteChannel);

// add a field that fetches channel based on search parameter

module.exports(router);