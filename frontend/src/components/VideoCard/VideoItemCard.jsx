import PropTypes from "prop-types";
import AvatarShow from "../Helpers/AvatarShow";
import { Link } from "react-router-dom";
import { useIncreaseViewsMutation } from "../../store/apiSlice";
import { formatDistanceToNow } from "date-fns";

const VideoItemCard = ({
  id,
  thumbnail,
  title,
  channelName,
  avatar,
  views,
  uploadTime,
}) => {

  const [increaseViews] = useIncreaseViewsMutation();

  const handleCardClick = async () => {
    if (!id) {
      console.error("Video ID is undefined, cannot increase views.");
      return;
    }

    try {
      console.log("Increasing views for video ID:", id);
      await increaseViews({ id, body: { views: views + 1 } }).unwrap();
    } catch (error) {
      console.error("Failed to increment views:", error);
    }
  };

  const timeAgo = formatDistanceToNow(new Date(uploadTime), {
      addSuffix: true,
    });

  return (
    <Link to={`/video/${id}`} onClick={handleCardClick}>
      <div className="flex flex-col flex-grow text-textPrimary bg-background rounded-lg hover:scale-105 transition-transform duration-200 cursor-pointer">
        <img
          src={thumbnail}
          alt="Video Thumbnail"
          loading="lazy"
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
              {views} views • {timeAgo}
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
  avatar: PropTypes.string,
  views: PropTypes.number.isRequired,
  uploadTime: PropTypes.string.isRequired,
};

export default VideoItemCard;
