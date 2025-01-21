// import PropTypes from "prop-types";

// const VideoItemCard = ({
//   thumbnail,
//   title,
//   channelName,
//   channelAvatar,
//   views,
//   uploadTime,
// }) => {

import thumbnail from "../../assets/test_object/thumbnail.avif";
import channelAvatar from "../../assets/test_object/channel_profile.jpg";

const VideoItemCard = () => {
  const title = "this portfolio got me hired in the gaming industry";
  const channelName = "My GameDev Pal";
  const views = 15;
  const uploadTime = "4 Months ago";



  return (
    <div className="flex flex-col flex-grow text-textPrimary bg-background rounded-lg hover:scale-105 transition-transform duration-200 cursor-pointer">
      <img
        src={thumbnail}
        alt="Video Thumbnail"
        className="w-full object-cover rounded-t-lg"
      />

      <div className="flex p-2 gap-3">
        <img
          src={channelAvatar}
          alt={`${channelName} Avatar`}
          className="w-10 h-10 rounded-full"
        />

        <div className="flex flex-col flex-1">
          <h3 className="text-md font-semibold line-clamp-2">
            {title}
          </h3>

          <p className="text-sm text-textSecondary">{channelName}</p>
          <p className="text-sm text-textSecondary">
            {views} views • {uploadTime}
          </p>
        </div>
      </div>
    </div>
  );
};

// VideoItemCard.propTypes = {
//   thumbnail: PropTypes.string.isRequired,
//   title: PropTypes.string.isRequired,
//   channelName: PropTypes.string.isRequired,
//   channelAvatar: PropTypes.string.isRequired,
//   views: PropTypes.string.isRequired,
//   uploadTime: PropTypes.string.isRequired,
// };

export default VideoItemCard;
