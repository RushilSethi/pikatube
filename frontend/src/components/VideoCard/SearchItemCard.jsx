import thumbnail from "../../assets/test_object/thumbnail.avif";
import channelAvatar from "../../assets/test_object/channel_profile.jpg";

const SearchItemCard = () => {
  const title = "This portfolio got me hired in the gaming industry";
  const channelName = "My GameDev Pal";
  const views = "15k";
  const uploadTime = "4 Months ago";
  const description =
    "In this video, I share how my game development portfolio helped me land a job in the gaming industry. Watch to learn tips, tools, and strategies.";

  return (
    <div className="flex flex-col felx-shrink max-w-[80vw] md:flex-row gap-4 p-4 hover:bg-hover rounded-lg transition duration-200 cursor-pointer">
      <img
        src={thumbnail}
        alt="Video Thumbnail"
        className="w-full md:w-60 h-36 object-cover rounded-lg"
      />

      <div className="flex flex-col flex-1">
        <h3 className="text-xl font-semibold text-textPrimary line-clamp-2">
            {title}
        </h3>

        <div className="flex items-center gap-2 my-1">
          <img
            src={channelAvatar}
            alt={`${channelName} Avatar`}
            className="w-8 h-8 rounded-full"
          />
          <p className="text-sm text-textSecondary">{channelName}</p>
        </div>

        <p className="text-sm text-textSecondary">
          {views} views • {uploadTime}
        </p>

        <p className="text-sm text-textSecondary mt-2 line-clamp-3">
          {description}
        </p>
      </div>
    </div>
  );
};

export default SearchItemCard;
