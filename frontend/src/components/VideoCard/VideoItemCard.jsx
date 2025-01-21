import PropTypes from "prop-types";

const VideoItemCard = ({
  thumbnail,
  title,
  channelName,
  channelAvatar,
  views,
  uploadTime,
}) => {
  return (
    <div className="flex flex-col w-full max-w-xs text-textPrimary bg-background rounded-lg hover:scale-105 transition-transform duration-200 cursor-pointer">
      {/* Thumbnail */}
      <img
        src={thumbnail}
        alt="Video Thumbnail"
        className="w-full h-48 object-cover rounded-t-lg"
      />

      {/* Video Details */}
      <div className="flex p-4 gap-3">
        {/* Channel Avatar */}
        <img
          src={channelAvatar}
          alt={`${channelName} Avatar`}
          className="w-10 h-10 rounded-full"
        />

        {/* Title and Info */}
        <div className="flex flex-col flex-1">
          {/* Title */}
          <h3 className="text-sm font-semibold text-ellipsis overflow-hidden whitespace-nowrap">
            {title}
          </h3>

          {/* Channel Name */}
          <p className="text-sm text-gray-400">{channelName}</p>

          {/* Views and Upload Time */}
          <p className="text-sm text-gray-500">
            {views} views • {uploadTime}
          </p>
        </div>
      </div>
    </div>
  );
};

VideoItemCard.propTypes = {
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  channelName: PropTypes.string.isRequired,
  channelAvatar: PropTypes.string.isRequired,
  views: PropTypes.string.isRequired,
  uploadTime: PropTypes.string.isRequired,
};

export default VideoItemCard;
