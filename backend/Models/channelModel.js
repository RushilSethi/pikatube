const mongoose = require("mongoose");

const channelSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  channelName: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    default: '',
  },
  videos: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Video',
    default: [],
  },
}, { timestamps: true });

const Channel = mongoose.model('Channel', channelSchema);
module.exports = Channel;
