const express = require("express");
const { authenticate } = require("../Middleware/authMiddleware");

const router = express.Router();

router.get('/:id', fetchChannelDetails);
router.get('/', fetchChannels);
router.post('/:id', authenticate, createChannel);
router.put('/:id', authenticate, editChannelDetails);
router.delete('/:id', authenticate, deleteChannel);

module.exports(router);