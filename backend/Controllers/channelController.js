const Channel = require("../Models/Channel");
const User = require("../Models/User");

exports.fetchChannelDetails = async (req, res) => {
  try {
    const channelId = req.params.id;

    const channel = await Channel.findById(channelId);

    if (!channel) {
      return res.status(404).json({ message: "Channel not found." });
    }

    res.status(200).json(channel);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.fetchChannels = async (req, res) => {
  try {
    const channels = await Channel.find({});

    if (!channels) {
      return res.status(404).json({ message: "Channels not available." });
    }

    res.status(200).send(channels);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.createChannel = async (req, res) => {
  const { channelName, description } = req.body;

  try {
    const isChannelNameTaken = await Channel.findOne({ channelName });
    if (isChannelNameTaken) {
      return res.status(400).json({ message: "Channel name already exists" });
    }

    const userHasChannel = await Channel.findOne({ userId: req.user.id });
    if (userHasChannel) {
      return res.status(400).json({ message: "User already has a channel" });
    }

    const newChannel = new Channel({
      userId: req.user.id,
      channelName,
      description,
      videos: [],
    });

    const savedChannel = await newChannel.save();

    await User.findByIdAndUpdate(req.user.id, { channelId: savedChannel._id });

    res.status(201).json(savedChannel);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


exports.updateChannel = async (req, res) => {
  const { id } = req.params;
  const { channelName, description } = req.body;

  try {
    const channel = await Channel.findById(id);
    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    if (channel.userId.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ message: "Not authorized to edit this channel" });
    }

    channel.channelName = channelName || channel.channelName;
    channel.description = description || channel.description;

    const updatedChannel = await channel.save();
    res.status(200).json(updatedChannel);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.deleteChannel = async (req, res) => {
  const { id } = req.params;
  try {
    const channel = await Channel.findOneAndDelete({
      _id: id,
      userId: req.user.id,
    });

    if (!channel) {
      return res.status(404).json({
        message: "Channel not found or not authorized to delete this channel",
      });
    }

    await User.findByIdAndUpdate(req.user.id, { $unset: { channelId: "" } });

    res.status(200).json({ message: "Channel deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
