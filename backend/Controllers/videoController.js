const Video = require("../Models/Video");
const Channel = require("../Models/Channel");
const User = require("../Models/User");

exports.fetchVideoDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const videoDetails = await Video.findById(id)
      .populate("comments.userId", "username avatar")
      .populate({
        path: "channelId",
        select: "channelName userId",
        populate: {
          path: "userId",
          select: "avatar",
        },
      });
    if (!videoDetails) {
      return res.status(404).json({ message: "Video not found" });
    }
    const { channelId, ...videoData } = videoDetails.toObject();
    const { channelName, userId } = channelId || {};
    const { avatar } = userId || {};

    const response = {
      ...videoData,
      channelId: channelId._id,
      channelName: channelName || null,
      avatar: avatar || null,
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getVideosByIds = async (req, res) => {
  try {
    const { videoIds } = req.body;

    if (!Array.isArray(videoIds) || videoIds.length === 0) {
      return res.status(400).json({ message: "Invalid input, please provide an array of video IDs." });
    }

    const videos = await Video.find({ '_id': { $in: videoIds } });

    if (!videos || videos.length === 0) {
      return res.status(404).json({ message: "No videos found with the provided IDs." });
    }

    return res.status(200).json(videos);
  } catch (error) {
    console.error("Error fetching videos:", error);
    return res.status(500).json({ message: "An error occurred while fetching videos." });
  }
};


exports.fetchVideos = async (req, res) => {
  try {
    const videos = await Video.find({})
      .populate({
        path: "channelId",
        select: "channelName userId",
        populate: {
          path: "userId",
          select: "avatar",
        },
      });

    if (!videos || videos.length === 0) {
      return res.status(404).json({ message: "Videos not available" });
    }

    const response = videos.map((video) => {
      const { channelId, ...videoData } = video.toObject();
      const { channelName, userId } = channelId || {};
      const { avatar } = userId || {};

      return {
        ...videoData,
        channelName: channelName || null,
        avatar: avatar || null,
      };
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.addVideo = async (req, res) => {
  const { id: channelId } = req.params;
  const { videoUrl, title, thumbnailUrl, description, tags } = req.body;

  try {
    const channel = await Channel.findById(channelId);
    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    if (channel.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to upload videos to this channel" });
    }

    const video = new Video({
      videoUrl,
      title,
      thumbnailUrl,
      description,
      channelId,
      tags,
      uploadDate: new Date(),
    });

    const savedVideo = await video.save();

    channel.videos.push(savedVideo._id);
    await channel.save();

    res.status(201).json(savedVideo);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.editVideoDetails = async (req, res) => {
  const { id } = req.params;
  const { videoUrl, title, thumbnailUrl, description, tags } = req.body;

  try {
    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    const channel = await Channel.findById(video.channelId);
    if (!channel) {
      return res
        .status(404)
        .json({ message: "Channel associated with the video not found" });
    }

    if (channel.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to edit this video" });
    }

    video.videoUrl = videoUrl || video.videoUrl;
    video.title = title || video.title;
    video.thumbnailUrl = thumbnailUrl || video.thumbnailUrl;
    video.description = description || video.description;
    video.tags = tags || video.tags;

    const updatedVideo = await video.save();
    res.status(200).json(updatedVideo);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.deleteVideo = async (req, res) => {
  const { id } = req.params;

  try {
    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    const channel = await Channel.findById(video.channelId);
    if (!channel) {
      return res
        .status(404)
        .json({ message: "Channel associated with the video not found" });
    }

    if (channel.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this video" });
    }

    await Video.findByIdAndDelete(id);

    channel.videos = channel.videos.filter(
        (videoId) => videoId.toString() !== id
    );
    await channel.save();

    res.status(200).json({ message: "Video deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.interactWithVideo = async (req, res) => {
  const { id } = req.params;
  const { like, dislike, comment } = req.body;
  const userId = req.user.id; 

  try {
    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    if (views !== undefined) {
      video.views = views;
    }

    const likedIndex = video.likedBy.indexOf(userId);
    const dislikedIndex = video.dislikedBy.indexOf(userId);

    if (like) {
      if (likedIndex === -1) {
        video.likedBy.push(userId);
        video.likes += 1;

        if (dislikedIndex !== -1) {
          video.dislikedBy.splice(dislikedIndex, 1);
          video.dislikes -= 1;
        }
      }
    } else if (dislike) {
      if (dislikedIndex === -1) {
        video.dislikedBy.push(userId);
        video.dislikes += 1;

        if (likedIndex !== -1) {
          video.likedBy.splice(likedIndex, 1);
          video.likes -= 1;
        }
      }
    }

    if (comment) {
      video.comments.push({
        userId: req.user.id,
        text: comment.text,
        createdAt: new Date(),
      });
    }

    const updatedVideo = await video.save();
    res.status(200).json(updatedVideo);
  } catch (error) {
    console.error("Error updating video interaction:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const mongoose = require("mongoose");
exports.increaseViews = async (req, res) => {
  const { id } = req.params;
  const { views } = req.body;

  // Check if ID is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid video ID format" });
  }

  try {
    const video = await Video.findById(id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    video.views = views;

    const updatedVideo = await video.save();
    res.status(200).json(updatedVideo);
  } catch (error) {
    console.error("Error updating video interaction:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


exports.searchVideosAndChannels = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: "Search query is required." });
  }

  try {
    // Case-insensitive regex for search
    const regex = new RegExp(query, 'i');

    const videos = await Video.find({
      $or: [{ title: regex }, { tags: { $in: [query] } }]
    })
      .populate({
        path: 'channelId',
        select: 'channelName userId',
        populate: {
          path: 'userId',
          select: 'avatar'
        }
      });

    const channels = await Channel.find({
      channelName: { $regex: regex }
    })
      .populate('userId', 'avatar');

    res.json({ videos, channels });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error performing search." });
  }
};


