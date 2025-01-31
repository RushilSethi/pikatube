import { Link } from "react-router-dom";
import AvatarShow from "../Helpers/AvatarShow";
import { useIncreaseViewsMutation } from "../../store/apiSlice";
import { formatDistanceToNow } from "date-fns";
import PropTypes from "prop-types";

const SearchItemCard = ({
  id,
  title,
  channelName,
  views,
  uploadTime,
  description,
  avatar,
  thumbnail,
}) => {
  const [increaseViews] = useIncreaseViewsMutation();
  const timeAgo = formatDistanceToNow(new Date(uploadTime), {
    addSuffix: true,
  });

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
  return (
    <Link to={`/video/${id}`} onClick={handleCardClick}>
      <div className="flex flex-col felx-shrink max-w-[80vw] md:flex-row gap-4 p-4 hover:bg-hover rounded-lg transition duration-200 cursor-pointer">
        <img
          src={thumbnail}
          alt="Video Thumbnail"
          loading="lazy"
          className="w-full md:w-60 h-36 object-cover rounded-lg"
        />

        <div className="flex flex-col flex-1">
          <h3 className="text-xl font-semibold text-textPrimary line-clamp-2">
            {title}
          </h3>

          <div className="flex items-center gap-2 my-1">
            <div className="h-8 w-8">
              <AvatarShow avatarUrl={avatar} />
            </div>
            <p className="text-sm text-textSecondary">{channelName}</p>
          </div>

          <p className="text-sm text-textSecondary">
            {views} views • {timeAgo}
          </p>

          <p className="text-sm hidden md:flex text-textSecondary mt-2 line-clamp-3">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
};

SearchItemCard.propTypes = {
  id: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  channelName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  views: PropTypes.number.isRequired,
  uploadTime: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

export default SearchItemCard;
