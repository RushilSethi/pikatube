const Video = require("../models/Video");

exports.fetchVideoDetails = async (req, res) => {
    const { id } = req.params;
    
    try {
        const videoDetails = await Video.findById(id).populate("comments.userId", "username avatar");
        if(!videoDetails) {
            return res.status(404).json({ message: "Video not found" });
        }
        res.status(200).json(videoDetails);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

exports.fetchVideos = async (req, res) => {
    try {
        const videos = await Video.find({});
        if(!videos) {
            return res.status().json({ message: "Videos not available" })
        }
        res.status(200).json(videos)
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

exports.addVideo = async (req, res) => {
    const { id: channelId } = req.params;
    const { videoUrl, title, thumbnailUrl, description, tags } = req.body;

    try {
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

        if (video.channelId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized to edit this video" });
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

        if (video.channelId.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized to delete this video" });
        }

        await video.remove();
        res.status(200).json({ message: "Video deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

exports.interactWithVideo = async (req, res) => {
    const { id } = req.params;
    const { likes, dislikes, comment } = req.body;

    try {
        const video = await Video.findById(id);
        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }

        if (likes !== undefined) {
            video.likes = likes;
        }

        if (dislikes !== undefined) {
            video.dislikes = dislikes;
        }

        if (comment) {
            video.comments.push({
                userId: req.user.id,
                text: comment.text,
                time: new Date(),
            });
        }

        const updatedVideo = await video.save();
        res.status(200).json(updatedVideo);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
