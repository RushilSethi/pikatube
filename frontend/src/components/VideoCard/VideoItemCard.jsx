import PropTypes from "prop-types";
import AvatarShow from "../Helpers/AvatarShow";
import { Link } from "react-router-dom";

const VideoItemCard = ({
  id,
  thumbnail,
  title,
  channelName,
  avatar,
  views,
  uploadTime,
}) => {
  return (
    <Link to={`/video/${id}`}>
      <div className="flex flex-col flex-grow text-textPrimary bg-background rounded-lg hover:scale-105 transition-transform duration-200 cursor-pointer">
        <img
          src={thumbnail}
          alt="Video Thumbnail"
          className="w-full object-cover rounded-t-lg"
        />

        <div className="flex p-2 gap-3">
          <div className="w-10 h-10">
            <AvatarShow avatarUrl={avatar} />
          </div>

          <div className="flex flex-col flex-1">
            <h3 className="text-md font-semibold line-clamp-2">{title}</h3>

            <p className="text-sm text-textSecondary">{channelName}</p>
            <p className="text-sm text-textSecondary">
              {views} views • {uploadTime}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

VideoItemCard.propTypes = {
  id: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  channelName: PropTypes.string.isRequired,
  channelAvatar: PropTypes.string.isRequired,
  views: PropTypes.string.isRequired,
  uploadTime: PropTypes.string.isRequired,
};

export default VideoItemCard;
