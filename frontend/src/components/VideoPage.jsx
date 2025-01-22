import React from "react";
import ReactPlayer from "react-player";
import PropTypes from "prop-types";
import AvatarShow from "./Helpers/AvatarShow";

const VideoPage = ({
  videoDetails,
  comments,
  channelDetails,
  handleLike,
  handleDislike,
  handleSubscribe,
}) => {
  return (
    <div className="flex flex-col items-center p-3 bg-background text-textPrimary min-h-screen w-full">
      <div className="w-full max-w-5xl aspect-video rounded-md overflow-hidden shadow-lg">
        <ReactPlayer
          url={videoDetails.videoUrl}
          controls
          playing={false}
          width="100%"
          height="100%"
        />
      </div>

      <div className="w-full max-w-5xl mt-6">
        <h1 className="text-2xl font-bold mb-2">{videoDetails.title}</h1>

        <div className="mb-2">
          <p className="text-sm text-textSecondary">
            <span>{videoDetails.views} views • </span>
            <span>{videoDetails.postedAt}</span>
          </p>
        </div>

        <div className="w-full max-w-5xl mt-8 p-4 bg-card rounded-md shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex flex-row items-center gap-3">
              <div className="h-12 w-12">
                <AvatarShow avatarUrl={channelDetails.avatarUrl} />
              </div>
              <div>
                <h3 className="text-xl font-bold">{channelDetails.name}</h3>
              </div>
              <button
                onClick={handleSubscribe}
                className={`px-4 py-2 rounded-md ${
                  channelDetails.isSubscribed
                    ? "bg-textPrimary text-background"
                    : "bg-background text-textPrimary hover:bg-hover"
                }`}
              >
                {channelDetails.isSubscribed ? "Subscribed" : "Subscribe"}
              </button>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={handleLike}
                className="px-4 py-2 bg-accentBlue text-textPrimary rounded-md hover:bg-blue-600"
              >
                👍 Like ({videoDetails.likes})
              </button>
              <button
                onClick={handleDislike}
                className="px-4 py-2 bg-accentRed text-textPrimary rounded-md hover:bg-red-600"
              >
                👎 Dislike ({videoDetails.dislikes})
              </button>
            </div>
          </div>
        </div>

        <div className="bg-card p-4 rounded-md mt-2">
          <p className="text-lg text-textSecondary">
            {videoDetails.description}
          </p>
        </div>
      </div>

      <div className="w-full max-w-5xl mt-8">
        <h3 className="text-xl font-bold mb-4">Comments</h3>
        <form className="mb-4 flex flex-col space-y-2">
        <textarea
          placeholder="Write a comment..."
          className="p-2 border bg-card outline-none border-border rounded-md w-full"
          rows="4"
        />
        <button
          type="submit"
          className="bg-card text-white py-2 px-4 rounded-md w-max self-start border-accentBlue border-2 duration-200 hover:bg-accentBlue"
        >
          Post Comment
        </button>
      </form>
        <div className="space-y-4">
          {comments.map((comment, index) => (
            <div key={index} className="p-4 bg-card rounded-md flex flex-row">
              <div className="h-12 w-12">
                <AvatarShow avatarUrl={comment.avatarUrl} />
              </div>
              <div className="ml-4">
                <p className="font-bold">@{comment.user}</p>
                <p>{comment.text}</p>
                <p className="text-sm text-textSecondary">
                  {new Date(comment.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

VideoPage.propTypes = {
  videoDetails: PropTypes.shape({
    videoUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    dislikes: PropTypes.number.isRequired,
    views: PropTypes.number.isRequired,
    postedAt: PropTypes.string.isRequired,
  }).isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
  channelDetails: PropTypes.shape({
    name: PropTypes.string.isRequired,
    subscriberCount: PropTypes.number.isRequired,
    isSubscribed: PropTypes.bool.isRequired,
  }).isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDislike: PropTypes.func.isRequired,
  handleSubscribe: PropTypes.func.isRequired,
};

export default VideoPage;
